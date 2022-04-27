const mongoose=require("mongoose");
const testSchema= mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    mark:{
        type:Number,
        require: true
    },
    creationDate:{
        type:Date,
        default:Date.now()
    },
    updateDate:{
        type:Date,
        default:Date.now()                                    

    }
});
module.exports= mongoose.model('Test', testSchema);