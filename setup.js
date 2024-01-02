
module.exports = () => {

    function setup_votes() {
        // Create votes file if not exists
        const votes_file = './data/votes.json';

        if (!require('fs').existsSync(votes_file)) {
            require('fs').writeFileSync(votes_file, '{}');
        }

        // Load votes
        let votes = require(votes_file);

        // Init uninitialized votes
        const solutions = require('./data/solutions.json').map(s => s.name);
        solutions.forEach(name => {
            if (!votes[name]) {
                votes[name] = [];
            }
        });

        // Save votes
        require('fs').writeFileSync(votes_file, JSON.stringify(votes));
        console.log('Votes initialized');
    }

    console.log('Setup')
    setup_votes();
    console.log('Setup done')
}
