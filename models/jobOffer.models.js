const string = require("@hapi/joi/lib/types/string");
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
    image:{
        type:String
    },
    
    
    fields:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Field",
        
    },
    candidacy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidacy"

    }],
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CompanyRes"
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
        
    }],
    created_at:{
        type:string
    }

   
   
   
    

    

});
offerSchema.virtual('image_url').get(function(){
    var fullUrl=req.protocol +'://' + req.get('host')
    return fullUrl+'/uploads/blog_images/'+this.image
})
module.exports=mongoose.model('Offer', offerSchema);