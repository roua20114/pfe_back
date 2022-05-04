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
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
        
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },  
    likedBy:{
        type:Array
    },
    dislekedBy:{
        type:Array
    },
    likes:{
        type:Number,
        default:0

    },
    dislikes:{
        type:Number,
        default:0
    }
    
    

    

});
module.exports=mongoose.model('Offer', offerSchema);