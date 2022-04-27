const mongoose= require("mongoose");
const candidacySchema= mongoose.Schema({
    creationDate:{
        type: Date,
        default:Date.now()
    },
    duration:{
        type: String,
        required: true

    },
    offer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Offer" 
    },
    candidat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Candidat"
    }

    

});
module.exports= mongoose.model('Candidacy',candidacySchema);