const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if(req.owner) {
        res.json({
            success: true,
            description: 'Logined as a ' + req.owner.email
        });
    } else {
        res.json({
            success: false,
            description: 'Please login first'
        });
    }
});

module.exports = router;