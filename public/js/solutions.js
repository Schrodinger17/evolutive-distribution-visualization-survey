import * as data from './data.js';

async function load_solution_list() {
    const distributions = await data.get_solutions();

    let solutions_list = document.getElementById('solutions');

    distributions.forEach(solution => {
        let solution_section = document.createElement('div')
        solution_section.className = "solution";

        let name = document.createElement('h3');
        name.innerHTML = solution.name;
        solution_section.appendChild(name);

        let description = document.createElement('p');
        description.innerHTML = solution.description;
        solution_section.appendChild(description);

        let img = document.createElement('img');
        img.src = "data/solutions/" + solution.raw_name + "/" + solution.images[0];
        img.style.maxWidth = "65%";
        img.style.maxHeight = "65%";
        solution_section.appendChild(img);

        solutions_list.appendChild(solution_section);
    });
}

load_solution_list();
