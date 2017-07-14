const express = require('express'),
    fileUpload = require('express-fileupload'),
    path = require('path');

const router = express.Router();

router.use(fileUpload());

router.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let uploadedFile = req.files.file;
    uploadedFile.mv('uploads/' + uploadedFile.name, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({success: true});
    });
});

module.exports = router;
