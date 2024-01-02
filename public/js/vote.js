import * as data from './data.js';

async function display_demographic_questions() {
    console.log('Displaying demographic questions');
    const demographic_questions = await data.get_demographic_questions();

    console.log('Loaded demographic questions: ' + JSON.stringify(demographic_questions));
    
    let parent_section = document.getElementById("demographic_questions");

    demographic_questions.forEach(question => {        
        let question_section = document.createElement('div');
        question_section.className = "demographic_question";

        let question_description = document.createElement('p');
        question_description.innerHTML = question.question;
        question_section.appendChild(question_description);

        switch (question.type) {
            case "text":
                let question_input = document.createElement('input');
                question_input.type = "text";
                question_input.id = question.question;
                question_section.appendChild(question_input);
                break;
            case "choice":
                let question_input_list = document.createElement('div');
                question_input_list.className = "demographic_question_choice_list";

                question.choices.forEach(choice => {
                    let question_input = document.createElement('input');
                    question_input.type = "radio";
                    question_input.name = question.question;
                    question_input.value = choice;
                    question_input.id = choice;

                    let question_label = document.createElement('label');
                    question_label.htmlFor = choice;
                    question_label.innerHTML = choice;

                    question_input_list.appendChild(question_input);
                    question_input_list.appendChild(question_label);
                });

                question_section.appendChild(question_input_list);
                break;
            default:
                console.error("Unknown question type: " + question.type);
        }


        parent_section.appendChild(question_section);
    });

}


async function display_a_solution(parent, solution) {
    console.log('Displaying solution: ' + solution.name);

    console.log(parent);
    let parent_section = document.getElementById(parent);
    
    let title = document.createElement('h3');
    title.innerHTML = solution.name;
    parent_section.appendChild(title);
    
    let description = document.createElement('p');
    description.innerHTML = solution.description;
    parent_section.appendChild(description);
    
    let image = document.createElement('img');
    image.src = "data/solutions/" + solution.raw_name + "/" + solution.images[0];
    image.style.maxWidth = "40%";
    
    parent_section.appendChild(image);
}


async function load_solutions() {
    const solutions = await data.get_solutions();
    console.log('Loaded solutions: ' + JSON.stringify(solutions));

    // Randomly choose 2 distributions (distinct)
    let n1 = Math.floor(Math.random() * solutions.length);
    let n2 = Math.floor(Math.random() * solutions.length);
    while (n1 == n2) {
        n2 = Math.floor(Math.random() * solutions.length);
    }

    let proposition1 = solutions[n1];
    let proposition2 = solutions[n2];

    display_a_solution("proposition_1", proposition1);
    display_a_solution("proposition_2", proposition2);    
}

async function display_criteria() {
    let criteria = await data.get_criteria();
    
    let criteria_list = document.createElement('div');
    criteria_list.id = 'criteria_list';
    criteria_list.className = 'criteria_list';

    criteria.forEach(crit => {
        let criteria = document.createElement('div');
        criteria.id = crit.name;
        criteria.innerHTML = crit.name;
        criteria.className = "criteria";
        criteria_list.appendChild(criteria);

        let inputs = document.createElement('div');
        inputs.className = "inputs";

        let first_input = document.createElement('input');
        first_input.type = "radio";
        first_input.id = "0";
        first_input.name = crit.name;
        inputs.appendChild(first_input);

        let first_question_label = document.createElement('label');
        first_question_label.htmlFor = crit.name;
        first_question_label.innerHTML = crit.min;
        inputs.appendChild(first_question_label);

        const range = [...Array(crit.nb_values - 2).keys()].map(x => x + 1);
        console.log(range);
        range.forEach(i => {
            let input = document.createElement('input');
            input.type = "radio";
            input.id = String(i);
            input.name = crit.name;
            inputs.appendChild(input);

            let question_label = document.createElement('label');
            question_label.htmlFor = String(i);
            question_label.innerHTML = String(i);
            inputs.appendChild(question_label);
        });

        let last_input = document.createElement('input');
        last_input.type = "radio";
        last_input.id = String(crit.nb_values);
        last_input.name = crit.name;
        inputs.appendChild(last_input);

        let last_question_label = document.createElement('label');
        last_question_label.htmlFor = String(crit.nb_values);
        last_question_label.innerHTML = crit.max;
        inputs.appendChild(last_question_label);

        criteria.appendChild(inputs);
    });

    let parent_section = document.getElementById("criteria");
    parent_section.appendChild(criteria_list);
}

display_demographic_questions();
load_solutions();
display_criteria();