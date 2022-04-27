const User= require('../models/user.models')



exports.myprofile=(req,res)=>{
    User.findOne({_id:req.user._id},(error,user)=>{
        if(error){
            console.log("something went wrong !!")
            res.json({errormsg:"something went wrong"})
        }
        else{
            res.status(200).json({user:user, msg:"all ok from myProfile"})
        }
    }).select("-password")

}
exports.editProfile=(req,res)=>{
    let emailchange
    if(req.email== req.body.email){
        emailchange="no"
    }
    else{
        emailchange="yes"
    }
    User.updateOne({_id:req.userId},{
        username: req.body.username,
        email:req.body.email,

    },function(err,user){
        if(err){
            console.log("something  went wrong !!")
            res.json({errormsg:"something went wrong!!"})
        }
        else{
            console.log("something went wrong!!")
            res.status(201).json({msg:"edited profile" , emailchange:emailchange})
        }
    })
}