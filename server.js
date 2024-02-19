'use strict';

// Initialize the votes
const setup = require('./setup.js')
setup();

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/html');

app.use(express.static('/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const api = require('./api.js');
app.use('/api', api());

app.use('/public', express.static('public'));

app.use('/data', express.static('data'));

app.get('/', (req, res) => {
    res.sendFile('public/html/index.html', { 'root': __dirname });
})

app.get('/tinder', (req, res) => {
    res.sendFile('public/html/tinder.html', { 'root': __dirname });
})

const PORT = process.env.PORT || 80;

const server = app.listen(PORT, () => {
    console.log('Listen on port ' + PORT);
});

server.timeout = 10000;

app.quit = () => {
    server.close();
};
