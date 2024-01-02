'use strict';

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/html');

app.use(express.static('/public'));

const api = require('./api.js');
app.use('/api', api());

app.use('/public', express.static('public'));

app.use('/data', express.static('data'));

app.get('/', (req, res) => {
    console.log('/');
    res.sendFile('public/html/index.html', { 'root': __dirname });
})

app.get('/vote', (req, res) => {
    console.log('/vote');
    res.sendFile('public/html/vote.html', { 'root': __dirname });
})

app.get('/solutions', (req, res) => {
    console.log('/solutions');
    res.sendFile('public/html/solutions.html', { 'root': __dirname });
})

const PORT = process.env.PORT || 80;

const server = app.listen(PORT, () => {
    console.log('Listen on port ' + PORT);
});

server.timeout = 10000;

app.quit = () => {
    server.close();
};
