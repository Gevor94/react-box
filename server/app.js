const express = require('express');
const path = require('path');

const app = express();

app.get('*', (req, res) => {
    //TODO
    console.log('Received request');
});

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    let obj = JSON.parse(req.query.data);
    res.json(req.query.data);
});

app.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    let obj = JSON.parse(req.query.data);
    res.json(req.query.data);
});
module.exports = app;
