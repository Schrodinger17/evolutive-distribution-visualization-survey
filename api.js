'use strict';

const express = require('express');

module.exports = () => {
    const app = express();

    // Get the list of candidates
    app.get('/solutions', async (req, res) => {
        res.sendFile('data/solutions.json', { 'root': __dirname });
    });

    // Get the list of votes
    app.get('/votes', async (req, res) => {
        res.sendFile('data/votes.json', { 'root': __dirname });
    });

    // Get the list of criteria
    app.get('/criteria', async (req, res) => {
        res.sendFile('data/criteria.json', { 'root': __dirname });
    });

    // Get the list of tasks
    app.get('/tasks', async (req, res) => {
        res.sendFile('data/tasks.json', { 'root': __dirname });
    });

    // Vote for a candidate
    app.post('/vote', async (req, res) => {
        const solution_name = req.body.solution_name;
        const vote = req.body.vote; 
        
        let votes = require('./data/votes.json');
        votes[solution_name].votes.push(vote);

        require('fs').writeFileSync('data/votes.json', JSON.stringify(votes));
        res.sendFile('data/votes.json', { 'root': __dirname });
    });
    
    return app;
}