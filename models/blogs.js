const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    birthday:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
}, {timestamps:true,strict:true});

module.exports=mongoose.model("BlogModel",BlogSchema,"blogs")