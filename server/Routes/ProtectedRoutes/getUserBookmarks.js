const express = require('express'),
    crud = require('../../crud');

const router = express.Router();

router.get('/', (req, res) => {
    if(req.owner) {
        let callback = (err, result) => {
            if(err) {
                res.json({
                    success: false
                });
                return;
            }
            res.json({
                success: true,
                action: 'getUserBookmarks',
                files: result
            });
        };
        crud.getUserBookmarks(req.owner, callback);
    }
    else {
        res.json({
            success: false,
            description: 'error' //TODO
        });
    }

});

module.exports = router;