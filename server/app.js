const express = require('express'),
    loginRoute = require('./Routes/login'),
    mainRoute = require('./Routes/main'),
    registerRoute = require('./Routes/register');

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
//set headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', mainRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});