const express = require('express'),
    crud = require('../crud');

const router = express.Router();

router.get('/*', (req, res) => {
    res.send(JSON.stringify(req))
});

module.exports = router;