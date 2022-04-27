const express= require('express')
const mongoose=require ('mongoose')
const msgSchema=mongoose.Schema({
    
    content:String,
    sendDate:{type:Date,
        default:Date.now()},
    senderId: Number,
    receiverId: Number
});
module.exports= mongoose.model('Msg', msgSchema);