const express = require('express'),
    jwt    = require('jsonwebtoken'),
    configs = require('../../Configs/config'),
    crud = require('../../crud'),
    uploadRoute = require('./upload'),
    mainRoute = require('./main'),
    getAllFiles = require('./getAllFiles'),
    search = require('./search');
    deleteFile = require('./delete');

const router = express.Router();

router.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, configs.jwtSecretKey, (err, owner) => {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.owner = owner;
            }
            next();
        });
    } else {
        next();
    }
});

router.use('/upload', uploadRoute);
router.use('/main', mainRoute);
router.use('/getAllFiles', getAllFiles);
router.use('/search', search);
router.use('/delete', deleteFile);

module.exports = router;
