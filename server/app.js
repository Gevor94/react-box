const express = require('express'),
    loginRoute = require('./Routes/login'),
    mainRoute = require('./Routes/main'),
    registerRoute = require('./Routes/register'),
    uploadRoute = require('./Routes/upload');

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
//set headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    req.header("Access-Control-Allow-Headers", "access-token");
    next();
});

app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', mainRoute);
app.use('/', uploadRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});