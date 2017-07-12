let express = require('express'),
    path = require('path'),
    crud = require('./crud'),
    user = require('./User/user'),
    jwt    = require('jsonwebtoken'),
    passport = require("passport"),
    passportJWT = require("passport-jwt");

let app = express(),
    JwtStrategy = passportJWT.Strategy,
    ExtractJwt = passportJWT.ExtractJwt;


app.get('*', (req, res) => {
    //TODO
    console.log('Received request');
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'tasmanianDevil'
};

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    let user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let getUserCB = (user) => {
        if(!user) {
            res.end(JSON.stringify({success: false}));
        } else {

        }
    };
    let requestedUser = JSON.parse(req.query.data);
    crud.getUserByEmail(requestedUser.email, getUserCB);
    //crud.doLogin(obj);
    res.json(req.query.data);

});

app.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let newUser = JSON.parse(req.query.data),
        registerUserCB = () => {
            res.end(JSON.stringify({success: true}));
        },
        getUserCB = (user) => {
            if(user) {
                res.end(JSON.stringify({success: false}));
            } else {
                crud.registerNewUser(newUser, registerUserCB);
            }
        };
    crud.getUserByEmail(newUser.email, getUserCB);
});
module.exports = app;
