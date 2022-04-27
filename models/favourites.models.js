
const mongoose=require("mongoose")
const favouritesSchema=mongoose.Schema({
    userid:{
        type:String
    },
    useremail:{
        type:String
    },
    items:{
        type:Array,
        default:[]
    },
    total:{
        type:Number,
        default:0
    },
    created:{type:Date, default: Date.now}
})
module.exports=mongoose.model('favourites',favouritesSchema)