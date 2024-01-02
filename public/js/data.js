
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
export async function post_votes(solution_name, vote) {
    await fetch('/api/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solution_name: solution_name, vote: vote })
    })
}