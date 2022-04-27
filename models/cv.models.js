const mongoose= require("mongoose");
const cvSchema= mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    url:{
        type: String,
        required:true
    }
});
module.exports= mongoose.model('Cv', cvSchema)