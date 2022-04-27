const mongoose= require("mongoose");
const contractSchema= mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    creationDate:{
        type: Date,
       default:Date.now()
    },
    updateDate:{
        type: Date,
        default:Date.now()
    }

});
module.exports= mongoose.model('Contract', contractSchema);