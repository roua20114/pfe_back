const mongoose= require("mongoose");


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
    },
    password: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,


    },
    username: {
        type: String,
        required: true,
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