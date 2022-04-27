const mongoose= require("mongoose");

const offerSchema= mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    qualifications:{
        type: String,
        required: true 
    },
    expirationDate:{
        type: Date,
       
    },
    creationDate:{
        type: Date,
        default:Date.now()
    },
    jobType:{
        type: String,
        required: true
    },
    region:{
        type: String,
       required: true

    },
    technologiesReq:{
        type: String,
        required: true
    },
    diplomaReq:{
        type: String,
       required: true
    },
    placesAvai:{
        type: Number,
        required: true
    },
    logo:{
        type:String
    },
    fields:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Field",
        
    },
    candidacy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Offer"

    }],
    company:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CompanyRes"
    }]
        
    

});
module.exports=mongoose.model('Offer', offerSchema);