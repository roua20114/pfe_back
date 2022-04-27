const mongoose= require("mongoose");
const questionsSchema= mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    option1:{
        type: String,
        required: true
    },
    option2:{
        type:String,
        required: true
    },
    option3:{
        type: String, 
        required: true
    },
    option4:{
        type:String,
        required: true
    },
    answer:{
        type: String,
        required: true
    }
});
module.exports=mongoose.model('Questions', questionsSchema)