const express = require('express'),
    crud = require('../crud');

const router = express.Router();

router.post('/register', (req, res) => {
    let newUser = JSON.parse(req.query.data),
        registerUserCB = () => {
            res.json({success: true});
        },
        getUserCB = (user) => {
            if(user) {
                res.json({success: false});
            } else {
                crud.registerNewUser(newUser, registerUserCB);
            }
        };
    crud.getUserByEmail(newUser.email, getUserCB);
});

module.exports = router;
