const express = require('express'),
    jwt    = require('jsonwebtoken'),
    configs = require('../Configs/config');

const router = express.Router();

router.use((req, res, next) => {
    // check header or url parameters for token
    const token = req.query.token || req.headers['access-token'];

    // decode token
    if (token) {
        jwt.verify(token, configs.jwtSecretKey, (err, decoded) => {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decodedToken = decoded;
            }
            next();
        });
    } else {
        next();
    }
});

router.get('/main', (req, res) => {
    if(req.decodedToken) {
        res.json({
            success: true,
            description: 'Logined as a ' + req.decodedToken.email
        });
    } else {
        res.json({
            success: false,
            description: 'Please login first'
        });
    }
});

module.exports = router;