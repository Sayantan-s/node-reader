const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type : String,
        required :true
    },
    subhead : {
        type : String,
        required : true,
        maxLength : 30
    },
    content : { 
        type : String,
        required : true,
        maxLength : 300
    }
},{ timestamps : true })

const Blogs = mongoose.model('Blogs',blogSchema);

module.exports = Blogs;