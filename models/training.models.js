const mongoose= require("mongoose");
const trainingSchema=mongoose.Schema({
    diploma:{
        type: String,
        required: true
    },
    studyField:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    description:{
        type: String
    },
    result:{
        type: String,
        required: true
    }
});
module.exports=mongoose.model('training', trainingSchema);