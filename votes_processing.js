const fs = require('fs');


function write_columns_names(filename) {
    let line = 'date,dataset,task,';

    const demographic_questions = require('./data/demographic_questions.json');
    
    demographic_questions.forEach(question => {
        line += question.question + ',';
    });
    
    line += 'demographic_time,';

    const solutions = require('./data/solutions.json');

    solutions.forEach(solution => {
        line += solution.raw_name + ',' + solution.raw_name + '_time,';
    });

    solutions.forEach(solution1 => {
        solutions.forEach(solution2 => {
            if (solution1.raw_name.localeCompare(solution2.raw_name)) {
                line += solution1.raw_name + '_vs_' + solution2.raw_name + ',';
                line += solution1.raw_name + '_vs_' + solution2.raw_name + '_time,';
            }
        });
    });

    line += '\n';

    fs.writeFileSync(filename, line);
}

function get_columns_names(filename) {
    let header = fs.readFileSync(filename).toString()
        .split('\n')[0]
        .split(',');

    return header;
}

function write_vote_to_csv(filename, vote, columns_names, demographic_questions, solutions) {
    if (vote == undefined) return;
    if (vote == null) return;

    let line = '';

    line += vote.date + ',';
    line += vote.dataset.raw_name + ',';
    line += vote.task.name.replace(' ', '_') + ',';

    demographic_questions.forEach(question => {
        if (vote.demographic[question.question] == undefined) {
            line += ',';
            return;
        }

        line += vote.demographic[question.question] + ',';
    });
    line += vote.demographic.duration + ',';


    vote.solution.forEach(solution => {
        line += solution.solution + ',';
        line += solution.duration + ',';
    });

    const pre_processed_votes = {};
    vote.vote.forEach(vote => {
        let solution1 = vote.solutions[0];
        let solution2 = vote.solutions[1];
        if (solution1 <= solution2) {
            //swap
            const temp = solution2;
            solution2 = solution1;
            solution1 = temp;
        }
        pre_processed_votes[solution1 + '_vs_' + solution2] = vote;
    });

    console.log(pre_processed_votes);

    solutions.forEach(solution1 => {
        solutions.forEach(solution2 => {
            if (solution1.raw_name.localeCompare(solution2.raw_name)) {
                const v = pre_processed_votes[solution1.raw_name + '_vs_' + solution2.raw_name];
                console.log(solution1.raw_name + '_vs_' + solution2.raw_name, v);
                if (v == undefined) {
                    line += ',';
                    line += ',';
                    return;
                }
                line += v.vote + ',';
                line += v.duration + ',';
            }
        });
    });

    line += '\n';
    fs.appendFileSync(filename, line);
}

function write_votes_to_csv(filename, votes) {

    const columns_names = get_columns_names(filename);
    const demographic_questions = require('./data/demographic_questions.json');
    const solutions = require('./data/solutions.json');

    votes.forEach(vote => {
        write_vote_to_csv(filename, vote, columns_names, demographic_questions, solutions);
    });
}

function main() {
    const filename = 'votes.csv';

    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, '');
    }

    write_columns_names(filename);

    const votes = require('./data/votes.json');
    write_votes_to_csv(filename, votes);
}

main();