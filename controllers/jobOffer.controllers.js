const Offer = require("../models/jobOffer.models");
require ('dotenv').config
const fs=require('fs')
const User=require('../models/user.models')
const Field = require('../models/field.models')
const Comment=require('../models/comments.models')
// const fileUploadmiddleware=require('../middleware/fileUpload');
const { isEmpty } = require("../config/custom.config");
const { default: mongoose } = require("mongoose");



exports.add = async (req, res) => {
    const blogpost = Offer({
        username:req.decoded.admin._id,
         fields:req.body.fields,
        title:req.body.title,
         description:req.body.description,
         placesAvai:req.body.placesAvai,
         qualifications:req.body.qualifications,
        technologiesReq:req.body.technologiesReq,
          diplomaReq:req.body.diplomaReq,
         jobType:req.body.jobType,
        region:req.body.region,
         image:image_file_name
      });
	  
      blogpost
        .save()
        .then((result) => {
          res.json({ data: result["_id"],message:"success" });
        })
        .catch((err) => {
          console.log(err), res.json({ err: err ,message:"failed"});
        });
}
    
        

exports.findAllOffers = async(req, res) => {

   

	Offer.find().populate('fields').then(offers=>{
        res.send(offers);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}



exports.findById = async(req, res) => {
	Offer.findById(req.params.id).then((offer)=>{
        if(!offer){
           return res.status(404).send({message:"coudln't find Field"}) 
        }
        res.send(offer)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
    


exports.delete = (req, res) => {
	Offer.findByIdAndDelete(req.params.id).then((offer)=>{
        if(!offer){
            return res.status(404).send({message:"Unexisted Field"})
        }
        res.send(offer)
    }).catch((err)=>{
        if(err.kind ==='objectId'){
            return res.status(404).send({message:"ERROR Occured" +req.params.id})
        }
        res.status(500).send({message:"error"})
    })
}
exports.update = (req, res) => {
	if(!req.body){
        return res.status(400).send({message:"error"})
    }
    Offer.findByIdAndUpdate(req.params.id,{
		
		fields:req.body.fields,
	   title:req.body.title,
		description:req.body.description,
		placesAvai:req.body.placesAvai,
		qualifications:req.body.qualifications,
	   technologiesReq:req.body.technologiesReq,
		 diplomaReq:req.body.diplomaReq,
		jobType:req.body.jobType,
	   region:req.body.region,
		image:image_file_name
        

    }).then(offer=>{
        if(!offer){
            return res.statu(404).send({message:"Error" })
        }
        res.send(offer);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })
}
exports.getbyname =async(req,res)=>{
    let data= await Offer.find( {
        "$or":[
            {title:{$regex:req.params.key}},
            // {fields:{$regex:req.params.key}},
            {technologiesReq:{$regex:req.params.key}}
        ]
    })
    res.status(200).send(data)
}


    





