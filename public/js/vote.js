'use strict';

import * as data from './data.js';

let answers = {};
let dataset = undefined;
let task = undefined;

async function display_demographic_questions() {
    const demographic_questions = await data.get_demographic_questions();

    let demographic_section = document.createElement("div")
    demographic_section.id = "demographic_questions";

    let title = document.createElement('h1');
    title.innerHTML = "Demographic questions";
    demographic_section.appendChild(title);

    demographic_questions.forEach(question => {
        let question_section = document.createElement('div');
        question_section.className = "demographic_question";

        let question_description = document.createElement('h4');
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

        demographic_section.appendChild(question_section);
    });
    
    let body = document.getElementById("body");
    body.appendChild(demographic_section);

    let start_time = new Date();
    // Send button
    let send_button = document.createElement('button');
    send_button.innerHTML = "Continue";
    send_button.id = "send_button";
    send_button.onclick = function () {
        console.log("Demographic answers saved.");

        let demographic_answers = {};
        demographic_questions.forEach(question => {
            switch (question.type) {
                case "text":
                    demographic_answers[question.question] = document.getElementById(question.question).value;
                    break;
                case "choice":
                    let choices = document.getElementsByName(question.question);
                    choices.forEach(choice => {
                        if (choice.checked) {
                            demographic_answers[question.question] = choice.value;
                        }
                    });
                    break;
                default:
                    console.error("Unknown question type: " + question.type);
            }

            demographic_answers["duration"] = new Date() - start_time;
        });

        answers["demographic"] = demographic_answers;

        //Remove demographic questions
        let demographic_section = document.getElementById("demographic_questions");
        demographic_section.remove();

        //Remove continue button
        let send_button = document.getElementById("button");
        send_button.remove();

        //Display solutions
        display_solutions();
    };

    let button_div = document.createElement('div');
    button_div.id = "button";
    button_div.appendChild(send_button);
    
    body.appendChild(button_div);
}


//====================================================================================================================================
async function display_solution(solutions, id) {
    if (id == solutions.length) {

        let instruction_div = document.createElement('div')
        instruction_div.id = "instruction";

        let instruction_title = document.createElement('h2');
        instruction_title.innerHTML = "Instructions";
        instruction_div.appendChild(instruction_title);
        
        let instruction_description = document.createElement('p');
        instruction_description.innerHTML = "In the following, you will be given a task, and two visualizations. The visualizations plot data from the dataset described below. Your role is to indicate the more appropriate visualization completing the given task, by clicking on the preferred visualization, or to indicate if the two visualizations perform equally, by clicking on the middle space. An example is provided below.";
        instruction_div.appendChild(instruction_description);

        let task_title = document.createElement('h2');
        task_title.innerHTML = task.name;
        instruction_div.appendChild(task_title);

        let task_description = document.createElement('p');
        task_description.innerHTML = task.description;
        instruction_div.appendChild(task_description);

        let dataset_title = document.createElement('h2');
        dataset_title.innerHTML = "Dataset : " + dataset.name;
        instruction_div.appendChild(dataset_title);

        let dataset_description = document.createElement('p');
        dataset_description.innerHTML = dataset.description;
        instruction_div.appendChild(dataset_description);

        let example = document.createElement('h2');
        example.innerHTML = "Example";
        instruction_div.appendChild(example);

        let img_example = document.createElement('img');
        img_example.src = "data/vote_example.png";
        img_example.style.maxWidth = "50%";
        img_example.style.maxHeight = "50%";
        instruction_div.appendChild(img_example);
        
        // Next button
        let send_button = document.createElement('button');
        send_button.innerHTML = "Go to vote";
        send_button.id = "send_button";
        send_button.onclick = function () {
            console.log("Go to vote.");

            //Remove instruction
            let instruction_div = document.getElementById("instruction");
            instruction_div.remove();

            //Remove continue button
            let send_button = document.getElementById("button");
            send_button.remove();

            display_pairs();
        }

        let button_div = document.createElement('div');
        button_div.id = "button";
        button_div.appendChild(send_button);

        let body = document.getElementById("body");
        body.appendChild(instruction_div);
        body.appendChild(button_div);
        return;
    }

    const solution = solutions[id];

    let solution_div = document.createElement('div')
    solution_div.className = "solution";
    solution_div.id = "solution";
    //solution_div.style.maxHeight = "80%";

    let title = document.createElement('h1');
    title.innerHTML = "Solution presentation";
    solution_div.appendChild(title);

    let name = document.createElement('h2');
    name.innerHTML = solution.name;
    solution_div.appendChild(name);

    solution.description.split('\n').forEach(paragraph => {
        let description = document.createElement('p');
        description.innerHTML = paragraph;
        solution_div.appendChild(description);
    });

    let img_div = document.createElement('div');
    img_div.id = "img_div";

    let img = document.createElement('img');
    // img.src = "data/solutions/" + solution.raw_name + "/" + solution.raw_name + "_tokyo." + solution.file_format;
    img.src = "data/solutions/" + solution.raw_name + "/" + solution.raw_name + "." + solution.file_format;
    
    img_div.appendChild(img);
    
    solution_div.appendChild(img_div);
    
    let start_time = new Date();

    let button_div = document.createElement('div');
    button_div.id = "button";

    // Prev button
    if (id != 0) {
        let prev_button = document.createElement('button');
        prev_button.id = "send_button";
        prev_button.innerHTML = "Previous";
        prev_button.onclick = function () {
            console.log("Previous solution.");
    
            //Remove solution
            let solution_div = document.getElementById("solution");
            solution_div.remove();
            display_solution(solutions, id - 1);
        }

        button_div.appendChild(prev_button);
    }

    // Next button
    let next_button = document.createElement('button');
    next_button.id = "send_button";
    next_button.innerHTML = "Next";
    next_button.onclick = function () {
        console.log("Next solution.");

        //Remove solution
        let solution_div = document.getElementById("solution");
        solution_div.remove();


        // solution already saved in answers
        let already_saved = false;
        answers["solution"].forEach(saved_solution => {
            if (saved_solution["solution"] == solution.raw_name) {
                already_saved = true;
            }
        });

        if (!already_saved) {
            answers["solution"].push({"solution": solution.raw_name, "duration": new Date() - start_time});
        } else {
            answers["solution"].forEach(saved_solution => {
                if (saved_solution["solution"] == solution.raw_name) {
                    saved_solution["duration"] += new Date() - start_time;
                }
            });
        }

        console.log(answers["solution"])


        display_solution(solutions, id + 1);
    }
    button_div.appendChild(next_button);
    
    solution_div.appendChild(button_div);

    let body = document.getElementById("body");
    body.appendChild(solution_div);
}


async function display_solutions() {
    console.log("Display solutions.")
    const solutions = await data.get_solutions();

    //Times
    answers["solution"] = [];
    
    display_solution(solutions, 0);
    //display_solution([]);
}

//====================================================================================================================================

async function get_dataset() {
    const dataset = await data.get_dataset();

    return dataset[Math.floor(Math.random() * dataset.length)];
}

async function get_task() {
    const tasks = await data.get_tasks();

    return tasks[Math.floor(Math.random() * tasks.length)];
}

async function generate_pairs(n = 30) {
    const solutions = await data.get_solutions();

    let all_pairs = [];

    for (let i = 0; i < solutions.length; i++) {
        for (let j = 0; j < solutions.length; j++) {
            if (j >= i) continue;

            if (Math.random() < 0.5) {
                all_pairs.push([solutions[i], solutions[j]]);
            } else {
                all_pairs.push([solutions[j], solutions[i]]);
            }
        }
    }

    //Shuffle pairs
    all_pairs.sort(() => Math.random() - 0.5);

    //Get n pairs
    let pairs = all_pairs.slice(0, n);

    return pairs;
}

async function display_pair(pairs) {
    
    if (pairs.length == 0) {
        let body = document.getElementById("body");

        //Remove info
        let info_div = document.getElementById("info");
        info_div.remove();

        // Send Votes
        send_votes();

        return;
    }

    let start_time = new Date();

    let go_next = async function (vote) {
        console.log("Next pair.");

        answers["vote"].push({"solutions": pair.map(e => e.raw_name), "vote": vote, "duration": new Date() - start_time});
        
        //Remove solution
        let solution_div = document.getElementById("pairs");
        solution_div.remove();

        display_pair(pairs);
    }

    const pair = pairs.shift();

    let pairs_div = document.createElement('div')
    pairs_div.id = "pairs";

    pair.forEach(solution => {
        let solution_div = document.createElement('div')
        solution_div.className = "solution";

        let name = document.createElement('h2');
        name.innerHTML = solution.name;
        solution_div.appendChild(name);

        let img = document.createElement('img');
        img.src = "data/solutions/" + solution.raw_name + "/" + solution.raw_name + "_" + dataset.raw_name + "." + solution.file_format;
        img.style.maxWidth = "90%";
        img.style.maxHeight = "90%";
        
        solution_div.appendChild(img);

        solution_div.onclick = () => {go_next(solution.raw_name)};

        pairs_div.appendChild(solution_div);
    });

    let equal_text = document.createElement('h2');
    equal_text.innerHTML = "None of them is better than the other one.";


    let equal_div = document.createElement('div')
    equal_div.id = "equal";
    equal_div.onclick = () => {go_next("equal")};

    equal_div.appendChild(equal_text);

    //add equal_div in the second place of pairs_div
    pairs_div.insertBefore(equal_div, pairs_div.childNodes[1]);


    let body = document.getElementById("body");
    body.appendChild(pairs_div);
}

async function display_pairs() {
    console.log("Display pairs.")
    const pairs = await generate_pairs();

    answers["vote"] = [];

    let info_div = document.createElement('div')
    info_div.id = "info";

    let title = document.createElement('h1');
    title.innerHTML = "Vote";
    info_div.appendChild(title);
    
    let task_title = document.createElement('h2');
    task_title.innerHTML = task.name;
    info_div.appendChild(task_title);
    
    let task_description = document.createElement('p');
    task_description.innerHTML = task.description;
    info_div.appendChild(task_description);

    let body = document.getElementById("body");
    body.appendChild(info_div);

    display_pair(pairs);
}

async function send_votes() {
    console.log("Send votes.");

    answers["date"] = new Date();

    const status = await data.post_votes(answers);

    console.log(status);

    greatings();
}

async function greatings() {
    let body = document.getElementById("body");

    //Clean body
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    let greatings_div = document.createElement('div')
    greatings_div.id = "greatings";

    let greatings_title = document.createElement('h2');
    greatings_title.innerHTML = "Thank you for your participation!";
    greatings_div.appendChild(greatings_title);
    
    
    let greatings_link = document.createElement('a');
    greatings_link.href = "/";
    greatings_link.innerHTML = "Main page";

    let greatings_description = document.createElement('p');
    greatings_description.appendChild(greatings_link);

    greatings_div.appendChild(greatings_description);

    body.appendChild(greatings_div);
}

async function start() {
    dataset = await get_dataset();
    answers["dataset"] = dataset;

    task = await get_task();
    answers["task"] = task;

    display_demographic_questions();
}



start();