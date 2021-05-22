const express = require('express');
const {check, validationResult} = require('express-validator/check');
const fs = require("fs");
const json2csv = require('json2csv').parse;
const path = require('path');
const User = require('../../models/User');

const router = express.Router();

router.post('/',[
    check('data','data is required').not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors:errors.array});
    }
    const {data} = req.body;
    try {
        data.map(async (item)=>{
            let user = new User({
                email:item.email,
                name:item.name,
                gender:item.gender,
                status:item.status,
                created_at:Date.now(),
                update_at:Date.now()
            })
            const resData = await user.save();
        })
        res.send('Users Added to Database Successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
    // res.send(data);

});

router.get('/', (req, res) => {
    User.find()
      .sort({ date: -1 })
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
  });

router.put('/', (req, res)=>{
    const {id, email, name, gender,status,created_at,updated_at} = req.body;
    try {
        const userFields = {
            _id : id,
            email,
            name,
            gender,
            created_at,
            updated_at
        };
        User.findOne({_id : id}).then(user =>{
            if(user){
                User.findOneAndUpdate(
                    {_id : id},
                    {$set: userFields},
                    {new:true}
                ).then(user => res.json(user));
            }
            else{
                res.send("Server Error");
            }
        })
        res.status(200).send("success")
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

router.get('/exportCSV', (req, res) => {
    try {
        User.find()
      .sort({ date: -1 })
      .then(async(users) => {
       const filePath = path.join(__dirname, "../../client/public","/data.csv");
        let csv;
        var fields = ['id','email', 'name', 'gender', 'status', 'created_at', 'updated_at'];
        try {
            csv = await json2csv(users, {fields});
         } catch (err) {
            return res.status(500).json(err.message);
         }
         fs.writeFile(filePath, csv, function (err) {
            if (err) {
                console.log(err.message);
                return res.json(err).status(500);
            }
            else {
                setTimeout(function () {
                    fs.unlink(filePath, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('File has been Deleted');
                });
        
            }, 30000);
            res.download(filePath);
            }
        })
      })
      .catch(err => res.status(404).json({ nousersfound: err.message }));
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
  });

module.exports = router;