const express = require('express'),
    File = require('../../Model/FileModel')
    crud = require('../../crud');

const router = express.Router();

router.get('/', (req, res) => {
    if(req.owner) {
        let callback = (err, result) => {
            if(err) {
                return res.json({
                    success: false
                });
            }
            let foundedFiles = [];
            for(let i in result) {
                let tmpFile = result[i];
                content = tmpFile.filteredContent ? tmpFile.filteredContent : "File content can't be previewed";
                foundedFiles.push(new File(tmpFile.name, tmpFile.owner, tmpFile.path,'',tmpFile.id, content));
            }
            res.json({
                success: true,
                action: 'search',
                files: foundedFiles
            });
        };
        let query = JSON.parse(req.query.data);
        crud.getMatchedFiles(query.searchQuery, callback);
    } else {
        res.json({
            success: false,
            description: 'Please login first'
        });
    }

});

module.exports = router;
