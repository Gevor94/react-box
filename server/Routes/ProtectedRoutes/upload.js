const express = require('express'),
    path = require('path'),
    fileUpload = require('express-fileupload'),
    fileModel = require(path.join(__dirname, '../../Model/FileModel')),
    crud = require(path.join(__dirname, '../../crud'));

const router = express.Router();

router.use(fileUpload());

router.post('/', (req, res) => {
    if (!req.files) {
        res.json({success: false});
        return; //res.status(400).send('No files were uploaded.');
    }
    if(req.owner) {
        let uploadedFile = req.files.file,
            filePath = path.join(__dirname, '../../uploads/' + uploadedFile.name);
        uploadedFile.mv(filePath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            let file = new fileModel(uploadedFile.name, req.owner.email, 'uploads/' + uploadedFile.name);
            crud.insertFile(file, (err) => {
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
        });
    } else {
        res.json({
            success: false,
            description: 'Please login first'
        });
    }
});

module.exports = router;
