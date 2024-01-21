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

    // Get the list of demographic questions
    app.get('/demographic_questions', async (req, res) => {
        res.sendFile('data/demographic_questions.json', { 'root': __dirname });
    });

    // Get the list of dataset
    app.get('/dataset', async (req, res) => {
        res.sendFile('data/dataset.json', { 'root': __dirname });
    });

    // Vote for a candidate
    app.post('/vote', async (req, res) => {
        const vote = req.body;
        
        let votes = require('./data/votes.json');

        votes.push(vote);

        require('fs').writeFileSync('data/votes.json', JSON.stringify(votes));

        res.send('OK');
    });
    
    return app;
}