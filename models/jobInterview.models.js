const mongoose= require("mongoose");
const { TIME } = require("sequelize/types");
const interviewSchema= mongoose.Schema({
    date:{
        type:Date,
        required: true
    },
    acceptance:{
        type: Boolean,
        required: true
    },
    creationDate:{
        type: Date,
        required: true
    },
    updateDate:{
        type: Date,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    hour:{
        type:TIME,
        required: true
    }
});
module.exports= mongoose.model('Interview', interviewSchema);