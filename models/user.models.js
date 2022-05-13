

const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');




const UserSchema = new mongoose.Schema({

    password: {
        type: String,
        required: [true, 'Please enter a password'],

        minlength: [5, 'Minimum password length is 6 characters']

    },
    email: {
        type: String,
        
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
        type: string
    },
    visited: {
        type: Number,
        default: 0
    }

},

    { timestamps: true }


);









const User = mongoose.model('User', UserSchema);
module.exports = User;


