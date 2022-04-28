const express=require('express');

const mongoose=require('mongoose');

const comentsSchema=mongoose.Schema({
  
    content:{
        type: String,
        required: true
    },
    offer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Offer"
    }
});
   
   
module.exports=mongoose.model('Comments',comentsSchema);
