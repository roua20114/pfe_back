
const string = require("@hapi/joi/lib/types/string");
const mongoose= require("mongoose");


const candidatSchema= mongoose.Schema({
    image:{
        type:String

    },
    name:{
        type:string,
        required:true
    },
    surname:{
        type:string,
        required:true
    },
   
    description:{
        type: String,
        required: true

    },
    address:{
        type: String,
        required: true
    },
    zipCode:{
        type: Number,
        required: true
    },
    diploma:{
        type: String,
        required: true
    },
    BirthDate:{
        type:Date,
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
    tel:{
        type:Number
    },

    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }],
    candidature:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidacy'
    }]
   
  
    

},
{ timestamps: true });

module.exports= mongoose.model("Candidat",candidatSchema)