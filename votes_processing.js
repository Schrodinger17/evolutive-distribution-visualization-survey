const fs = require('fs');


function write_columns_names(filename) {
    let line = 'date,proposition_1,proposition_2,';

    const demographic_questions = require('./data/demographic_questions.json');
    demographic_questions.forEach(question => {
        line += question.question + ',';
    });

    const criteria = require('./data/criteria.json');

    criteria.forEach(crit => {
        line += crit.name + ',';
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

function write_vote_to_csv(filename, vote, columns_names, demographic_questions, criteria) {
    if (vote == undefined) return;
    if (vote == null) return;

    let line = '';

    line += vote.date + ',';
    line += vote.proposition_1 + ',';
    line += vote.proposition_2 + ',';

    demographic_questions.forEach(question => {
        if (vote.demographic_answers[question.question] == undefined) {
            line += ',';
            return;
        }

        line += vote.demographic_answers[question.question] + ',';
    });


    criteria.forEach(crit => {
        if (vote.criteria_answers[crit.name] == undefined) {
            line += ',';
            return;
        }

        line += vote.criteria_answers[crit.name] + ',';
    });

    line += '\n';
    fs.appendFileSync(filename, line);
}

function write_votes_to_csv(filename, votes) {

    const columns_names = get_columns_names(filename);
    const demographic_questions = require('./data/demographic_questions.json');
    const criteria = require('./data/criteria.json');

    votes.forEach(vote => {
        write_vote_to_csv(filename, vote, columns_names, demographic_questions, criteria);
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