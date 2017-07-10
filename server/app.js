// server/app.js
const express = require('express');
const path = require('path');

const app = express();

app.get('*', (req, res) => {
    //TODO
});

module.exports = app;
