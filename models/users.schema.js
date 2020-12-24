const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type :String,
        required: true
    },
    college : {
        type : String,
        required: true
    },
    passOut : {
        type : Number,
        required : true
    }
},{ timestamps : true })

const Students = mongoose.model('students', userSchema);

module.exports = Students