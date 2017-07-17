const express = require('express'),
    crud = require('../../crud');

const router = express.Router();

router.get('/', (req, res) => {
   if(req.owner) {
       let callback = (err, result) => {
            res.json(result);
       };
       crud.getAllFiles(callback);
   }
    else {
       res.json({
           success: false,
           description: 'Please login first'
       });
   }

});

module.exports = router;