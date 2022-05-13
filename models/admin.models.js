


const mongoose = require('mongoose');





const adminSchema= new mongoose.Schema({

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
        default:"admin"


    },
   
  
    pdp: {
        type: String
    },
   

},

    { timestamps: true }


);
module.exports= mongoose.model("Admin",adminSchema)











