const mongoose= require("mongoose");
const user=require('../models/user.models')

const companyResSchema= mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    companyAddress:{
        type: String,
        required: true
    },
    webSite:{
        type:String
    },
    description:{
        type: String,
        required: true
    },
    creationDate:{
        type:Date,
        required: true
    },
    logo :{
        type: String
    },
    region:{
        type: String,
        required: true 
    },
    sector:{
        type: String,
        required: true
    },
    tel:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true
    }
    
});
//const companyRes= user.discriminator("companyRes",companyResSchema)

module.exports= user.discriminator("companyRes",companyResSchema)