const express = require('express'),
    path = require('path'),
    crud = require(path.join(__dirname, '../../crud'));

const router = express.Router();

router.get('/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, '../../uploads/' + req.params.filename));
});

module.exports = router;
