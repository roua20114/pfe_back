const mongoose= require("mongoose");


const companyResSchema= mongoose.Schema({
    companyName:{
        type: String
    },
    companyAddress:{
        type: String
    },
    webSite:{
        type:String
    },
    description:{
        type: String
    },
    creationDate:{
        type:Date
    },
    logo :{
        type: String
    },
    region:{
        type: String 
    },
    sector:{
        type: String
    },
    tel:{
        type: Number
    },
    type:{
        type: String
    },
    password: {
        type: String

    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,


    },
    username: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    role: {
        type: String,
        default:"company"


    },
    verified: {
        type: Boolean,
        default: false
    },
   
    resetLink: {
        type: String,
        default: ''
    },
    pdp: {
        type: String
    },
    visited: {
        type: Number,
        default: 0
    },

    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }],
    offer:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Offer'
    }]
    
    
},{timestamps:true});


module.exports= mongoose.model("companyRes",companyResSchema)