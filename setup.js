const distributions = ['bean_plot', 'box_plot', 'mirrored_density_plot', 'violin_plot'];

function load_votes() {
    return require('./data/votes.json');
}

function save_votes(votes) {
    require('fs').writeFileSync('data/votes.json', JSON.stringify(votes));
}

function init_votes(votes) {
    distributions.forEach(d => {
        document.getElementById(d).addEventListener('click', () => {
            vote(d);
        });
    });
}


function setup_votes() {
    // Load the votes
    let votes = load_votes();

    // Initialize the votes (if not already initialized)
    votes = init_votes(votes);
    
    // Save the votes
    save_votes(votes);
}

setup_votes();
    
    