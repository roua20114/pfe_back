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
    },
    candidat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidat"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    commentIsApproved: {
        type: Boolean,
        default: false
    }
});
   
   
module.exports=mongoose.model('Comments',comentsSchema);
