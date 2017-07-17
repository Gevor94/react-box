const express = require('express'),
    loginRoute = require('./Routes/login'),
    registerRoute = require('./Routes/register'),
    protectedRoutes = require('./Routes/ProtectedRoutes/protectedRoutes'),
    uploads = require('./Routes/uploads');

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

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/', protectedRoutes);
app.use('/uploads', uploads);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});