const express = require('express'),
    fileUpload = require('express-fileupload'),
    crud = require('../../crud');

const router = express.Router();


router.post('/', (req, res) => {
    let bookmark = JSON.parse(req.query.data);
    if(req.owner) {
            crud.changeBookmarks(req.owner.email,bookmark, (err, result) => {
                if(err) {
                    res.json({
                        success: false,
                        description: 'Error'//TODO
                    });
                    return;
                }
                res.json({
                    success: true,
                    file: bookmark
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
