const mongoose= require("mongoose");
const experienceSchema= mongoose.Schema({
    jobType:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    position:{
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
    title:{
        type: String, 
        required: true
    },
    domain:{
        type: String,
        required: true 
    }
    
});
module.exports= mongoose.model('Experience', experienceSchema)