const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();

router.post('/',[
    check('data','data is required').not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors:errors.array});
    }
    res.send('You are in user route')

});


module.exports = router;