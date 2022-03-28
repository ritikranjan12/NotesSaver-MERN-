const mongoose = require('mongoose')
const {Schema} = mongoose;

const date = new Date();

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:String,
        default:date
    }

});

const Notes = mongoose.model('Note',NotesSchema);
module.exports = Notes