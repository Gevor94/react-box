const express = require('express'),
    path = require('path'),
    crud = require('../../crud');

const router = express.Router();


router.post('/', (req, res) => {
    if(req.owner) {
        let deletedFile = JSON.parse(req.query.data);
        crud.deleteFile(deletedFile, (err, file) => {
            if(err) {
                res.json({
                    success: false,
                    description: 'Error'//TODO
                });
                return;
            }
            res.json({
                success: true,
                file: file
            });
        });
    } else {
        res.json({
            success: false,
            description: 'Please login first'
        });
    }
});

module.exports = router;
