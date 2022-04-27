const mongoose= require("mongoose");
const user=require('../models/user.models')

const candidatSchema= mongoose.Schema({
   
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
   
  
    

});
//const candidat= 
module.exports= user.discriminator("Candidat",candidatSchema)