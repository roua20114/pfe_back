


const mongoose = require('mongoose');
const user=require('../models/user.models')




const adminSchema= new mongoose.Schema({

    password: {
        type: String,
        required: [true, 'Please enter a password'],

        minlength: [5, 'Minimum password length is 6 characters']

    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
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
    }

},

    { timestamps: true }


);
module.exports= user.discriminator("Admin",adminSchema)











