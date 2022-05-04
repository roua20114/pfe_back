
const mongoose= require("mongoose");
const user=require('../models/user.models')

const candidatSchema= mongoose.Schema({
    image:{
        type:String

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
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }]
   
  
    

});

module.exports= user.discriminator("Candidat",candidatSchema)