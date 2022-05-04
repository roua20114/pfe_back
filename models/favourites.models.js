
const mongoose=require("mongoose")
const favouritesSchema=mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    CartItems:[{
        offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true }
    }],
   
    
},{ timestamps: true })
module.exports=mongoose.model('favourites',favouritesSchema)