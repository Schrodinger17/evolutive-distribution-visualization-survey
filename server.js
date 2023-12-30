'use strict';

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/html');

app.use(express.static('/public'));


app.get('/', (req, res) => {
    console.log('/');
    res.sendFile('public/html/index.html', { 'root': __dirname });
})

app.get('/survey', (req, res) => {
    console.log('/survey');
    res.sendFile('public/html/survey.html', { 'root': __dirname });
})


const PORT = process.env.PORT || 80;

const server = app.listen(PORT, () => {
    console.log('Listen on port ' + PORT );
});

server.timeout = 10000;

app.quit = () => {
    server.close();
};
