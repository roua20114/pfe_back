const express=require('express');

const mongoose=require('mongoose');

const comentsSchema=mongoose.Schema({
  
    content:{
        type: String,
        required: true
    }
});
   
   
module.exports=mongoose.model('Comments',comentsSchema);
