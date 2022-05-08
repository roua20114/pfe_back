const Offer = require("../models/jobOffer.models");
require ('dotenv').config
const User=require('../models/user.models')
const Field = require('../models/field.models')
const Comment=require('../models/comments.models')
const fileUploadmiddleware=require('../middleware/fileUpload');
const { isEmpty } = require("../config/custom.config");



exports.add = async (req, res) => {
    try{  
        const offer = new Offer(req.body)
        await offer.save(req.body,(err,item)=>{
        if(err){
            res.status(406).json({success:false, message:"failed creation", data:null})
        }
        else{
            Field.findByIdAndUpdate(req.body.fields,{
                $push:{offers:offer}},()=>{
                    offer.populate({path:"fields", select:"name" },()=>{
                        res.status(201).json({success:true,message:"creaed successfully", data:item})

                    })

                })
            }
        })
    }catch(err){
        res.status(500).json({error:err})
    }
    

    
  
       

       
       
       


   

    }
        
;
exports.findAllOffers = (req, res) => {

   

    Offer.find()
  
    .then(offers => {
        res.send(offers);
    }).catch(err => {
        res.status(500).send({ message: "error" })
    })


}
exports.findById = (req, res) => {
    Offer.findById(req.params.id).then((offer) => {
        if (!offer) {
            return res.status(404).send({ message: "coudln't find offer" })
        }
        else{
            User.findOne({
                _id:req.decoded.userId
            },(err,user)=>{
                if(err){
                    res.json({success:false,message:err})
                }
                else{
                    if(!user){
                        res.json({success:false,message:'Unable to authenticate'})
                    }
                    else{
                        if(user.username!==offer.user){
                            res.json({success:false,message:'You are not authorized'})
                        }
                        else{
                            res.json({success:true,offer:offer})
                        }
                    
                    }
                }
            })
        }
        
    
})
}

exports.delete = (req, res) => {
    Offer.findByIdAndDelete(req.params.id).then((offer) => {
        if (!offer) {
            return res.status(404).send({ message: "Unexisted Offer" })
        }
        res.send(offer)
    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "ERROR Occured" + req.params.id })
        }
        res.status(500).send({ message: "error" })
    })
}
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "error" })
    }
   
    Offer.findByIdAndUpdate(req.params.id, {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        qualifications: req.body.qualifications,
        expirationDate: req.body.expirationDate,
        jobType: req.body.jobType,
        region: req.body.region,
        technologiesReq: req.body.technologiesReq,
        diplomaReq: req.body.diplomaReq,
        placesAvai: req.body.placesAvai,
        
        
        

    }).then(offer => {
        if (!offer) {
            return res.statu(404).send({ message: "Error" })
        }
        res.send(offer);
    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error " + req.params.id })
        }
        return res.status(500).send({ message: "error" + req.params.id });

    })

}
exports.getbyname =async(req,res)=>{
    try {
      await Offer.find({ref:req.query.title}).exec((err,item)=>{
          if(err){
              res.status(406).json({success:true,message:"failed  ",data:null})
          }else{
              res.status(200).json({success:true,message:" success",data:item})
          } 
  
      })
    } catch (error) {
        res.status(500).json(error.err)
        
    }  
}
exports.like= (req,res)=>{
    if(!req.body.id){
        res.json({success:false,message:'no id was provided'})
    }
    else{
        Offer.findOne({_id:req.body.id},(err,offer)=>{
            if(err){
                res.json({success:false,message:'Invalid blog id'})
            }
            else{
                if(!offer){
                    res.json({success:false,message:'That offer was not found'})
                }
                else{
                    User.findOne({_id:req.decoded.userId},(err,user)=>{
                        if(err){
                            res.json({success:false,message:'Something went wrong'})
                        }
                        else{
                            if(!user){
                                res.json({success:false,message:'Could not authenticate user'})
                            }else{
                                if(user.username===offer.user){
                                    res.json({success:false ,message:'cannot like your own post'})

                                }
                                else{
                                    if(offer.likedBy.includes(user.username)){
                                        res.json({success:false,message:'You already liked this post'})
                                    }
                                    else{
                                        if(offer.dislikedBy.includes(user.username)){
                                            offer.dislikes--;
                                            const arrayIndex= offer. dislikedBy.indexof(user.username)
                                            offer.deslikedBy.splice(arrayIndex,1)
                                            offer.likes++
                                            offer.likedBy.push(user.username)
                                            offer.save((err)=>{
                                                if(err){
                                                    res.json({success:false,message:'Somethign went wrong'})
                                                }
                                                else{
                                                    res.json({success:true, message:'Blog liked!'})
                                                }
                                            })
                                        }
                                        else{
                                            offer.likes++;
                                            offer.likedBy.push(user.username)
                                            offer.save((err)=>{
                                                if(err){
                                                    res.json({success:false,message:'Something went wrong'})

                                                }
                                                else{
                                                    res.json({success:true,message:'Blog liked!'})
                                                }
                                                

                                            })

                                        }
                                    }
                                }
                            }

                        }
                    })
                }
            }
        })
    }
}
exports.dislike=(req,res)=>{
    if(!req.body.id){
        res.json({success:false,message:'no id was provided'})
    }
    else{
        Offer.findOne({_id:req.body.id},(err,offer)=>{
            if(err){
                res.json({success:false,message:'Invalid blog id'})
            }
            else{
                if(!offer){
                    res.json({success:false, message:'That blog was not found'})
                }
                else{
                    if(!user){
                        res.json({success:false,message:'Could not authenticate user'})
                    }
                    else{
                        if(user.username===offer.user){
                            res.json({success:false,message:'Cannot dislike your own post'})
                        }else{
                            if(offer.dislikedBy.includes(user.username)){
                                res.json({success:false,message:'You already disliked this post'})
                            }
                            else{
                                if(offer.likedBy.includes(user.username)){
                                    blog.likes--
                                    const arrayIndex= offer.likedBy.indexof(user.username)
                                    offer.likedBy.splice(arrayIndex,1)
                                    offer.dislikes++
                                    offer.dislikedBy.push(user.username)
                                    offer.save((err)=>
                                    {
                                        if(err){
                                            res.json({success:false,message:'Something went wrong '})
                                        }
                                        else{
                                            res.json({ success: true, message: 'Blog disliked!' })
                                        }
                                    })
                                  

                                    }
                                    else{
                                        offer.dislikes++
                                        offer.dislikedBy.push(user.username)
                                        offer.save((err)=>{
                                            if(err){
                                                res.json({success:false,message:'Something went wrong'})
                                            }
                                            else{
                                                res.json({success:true,message:'Blog disliked!'})
                                            }
                                        })
                                    }

                                }
                            }
                        }
                    }
                }
            })
        }
 }
exports.comment=(req,res)=>{
    if(!req.body.comments){
        res.json({ success: false, message: 'No comment provided' });
    }
    else{
        if(!req.body.id){
            res.json({ success: false, message: 'No id was provided' });
        }
        else{
            Offer.findOne({_id:req.body.id},(err,offer)=>{
                if(err){
                    res.json({ success: false, message: 'Invalid Offer id' });
                }
                else{
                    if(!offer){
                        res.json({ success: false, message: 'Offer not found' });
                    }
                    else{
                        User.findOne({_id:req.decoded.userId},(err,user)=>{
                            if(err){
                                res.json({ success: false, message: 'Something went wrong' });
                               
                            }
                            else{
                                if(!user){
                                    res.json({
                                        success:false,message:'User not found'
                                    })
                                }
                                else{
                                    offer.comments.push({
                                        comments:req.body.comments,
                                        user:user.username
                                    })
                                    offer.save((err)=>{
                                        if(err){
                                            res.json({success:false,message:'Something went wrong'})
                                        }
                                        else{
                                            res.json({success:true,message:'Comment saved'})
                                        }
                                    })
                                }
                            }

                        })
                    }
                }
            })
        }
    }
    
}  

