
const mongoose=require('mongoose')
const fieldSchema= mongoose.Schema({
   
   
    name:{
        type:String,
        required:true
    },
    creationDate:{
        type: Date,
        default: Date.now()
        
    },
    updateDate:{
        type: Date,
        default:Date.now()
        

    },
    jobOffers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Offer"
    }]

});
module.exports=mongoose.model('Field',fieldSchema);