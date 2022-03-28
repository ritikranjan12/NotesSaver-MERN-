const mongoose = require('mongoose')
const {Schema} = mongoose;


const date = new Date();

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default: date
    }
});

const User = mongoose.model('user',UserSchema);
module.exports = User;