'use strict';

export async function get_votes() {
    const resJSON = await fetch('/api/votes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const votes = (await resJSON.json());
    return votes;
}

export async function get_solutions() {
    const resJSON = await fetch('/api/solutions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const solutions = (await resJSON.json());
    return solutions;
}

export async function get_criteria() {
    const resJSON = await fetch('/api/criteria', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const criteria = (await resJSON.json());
    return criteria;
}

export async function get_tasks() {
    const resJSON = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const tasks = (await resJSON.json());
    return tasks;
}

export async function get_dataset() {
    const resJSON = await fetch('/api/dataset', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const dataset = (await resJSON.json());
    return dataset;
}

export async function get_demographic_questions() {
    const resJSON = await fetch('/api/demographic_questions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const questions = (await resJSON.json());
    return questions;
}

// Vote
export async function post_votes(vote) {
    let status = await fetch('/api/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vote)
    });

    return status;
}
