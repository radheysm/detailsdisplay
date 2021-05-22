const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    gender:{
        type:String
    },
    status:{
        type:String
    },
    created_at:{
        type:Date
    },
    updated_at:{
       type:Date,
       default: Date.now
    }

});

module.exports = user = mongoose.model('user', UserSchema);