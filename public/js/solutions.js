import * as data from './data.js';

async function load_solution_list() {
    const distributions = await data.get_solutions();

    console.log('Loaded votes: ' + JSON.stringify(distributions));

    let solutions_list = document.getElementById('solutions');

    distributions.forEach(solution => {
        let solution_section = document.createElement('div')

        let name = document.createElement('h3');
        name.innerHTML = solution.name;
        solution_section.appendChild(name);

        let description = document.createElement('p');
        description.innerHTML = solution.description;
        solution_section.appendChild(description);

        let img = document.createElement('img');
        img.src = "data/solutions/" + solution.raw_name + "/" + solution.images[0];
        img.style.maxWidth = "30%";
        solution_section.appendChild(img);

        solutions_list.appendChild(solution_section);

        /*document.getElementById(d).addEventListener('click', () => {
            console.log('Voting for ' + d);
        });*/
    });
}

load_solution_list();
