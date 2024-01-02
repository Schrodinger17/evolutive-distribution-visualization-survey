import * as data from './data.js';

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

    let criteria = await data.get_criteria();
    
    // Criteria
    let criteria_list = document.createElement('div');
    criteria_list.id = 'criteria_list';
    criteria_list.className = 'criteria_list';

    criteria.forEach(d => {
        let criteria = document.createElement('div');
        criteria.id = "solution_name_" + d["name"];
        criteria.innerHTML = d["name"];
        criteria.className = "criteria";
        criteria_list.appendChild(criteria);

        /*document.getElementById(d).addEventListener('click', () => {
            console.log('Voting for ' + d);
        });*/
    });

    let parent_section = document.getElementById("criteria");
    parent_section.appendChild(criteria_list);
    
}

load_solutions();