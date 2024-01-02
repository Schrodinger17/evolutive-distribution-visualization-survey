
export async function get_votes() {
    const resJSON = await fetch('/api/votes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const votes = (await resJSON.json());
    return votes;
}

export async function get_solutions() {
    const resJSON = await fetch('/api/solutions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const solutions = (await resJSON.json());
    return solutions;
}

export async function get_criteria() {
    const resJSON = await fetch('/api/criteria', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const criteria = (await resJSON.json());
    return criteria;
}

// Vote
export async function insert_votes() {
    let votes = require('./data/votes.json');
    let votes_div = document.getElementById('votes');
    votes_div.innerHTML = '';
    for (let vote of votes) {
        let vote_div = document.createElement('div');
        vote_div.innerHTML = vote.name + ': ' + vote.votes;
        votes_div.appendChild(vote_div);
    }
}
