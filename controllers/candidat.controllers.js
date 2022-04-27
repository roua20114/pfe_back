const candidatM = require("../models/candidat.models")

const nodemailer= require("nodemailer")



module.exports = {

 

  getall:async(req,res)=>{
    try {
  await candidatM.find({}).exec((err,items)=>{
        if(err){
            res.status(406).json({success:true,message:"failed getall",data:null})
        }else{
            res.status(200).json({success:true,message:"getall with success",data:items})
        }
        
       }) 
    }catch (err) {
        res.status(500).json(error,err)    
    }
},
getbyname :async(req,res)=>{
    try {
      await candidatM.find({ref:req.query.ref}).exec((err,item)=>{
          if(err){
              res.status(406).json({success:true,message:"failed  ",data:null})
          }else{
              res.status(200).json({success:true,message:" success",data:item})
          } 
  
      })
    } catch (error) {
        res.status(500).json(error.err)
        
    }  
  },
getbyid:async(req,res)=>{
try {
    await candidatM.findById(req.params.id).exec((err,item)=>{
        if(err){
            res.status(406).json({success:true,message:"failed id",data:null})
        }else{
            res.status(200).json({success:true,message:"id with success",data:item})
        }  
        
    }) 
    } catch (err) {
        res.status(500).json(err.error)
        
    }
},
update:async(req,res)=>{
    try {
       await candidatM.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,item)=>{
           if(err){
               res.status(406).json({success:false, message:"failed update"+err,data:null})
           }else{
               res.status(200).json({success:true,message:"success update",data:item})
           }

       })
    } catch (error) {
        res.status(500).json(error)
        
    }


},     

delete: async(req,res)=>{
try {
    await  candidatM.findByIdAndDelete(req.params.id).exec((err,item)=>{
        if(err){
            res.status(406).json({success:false,message:"failed remove",data:null})
        }else{
            res.status(201).json({success:true,message:" success remove"})
        }
    })    
    
} catch (error) {
    res.status(500).json(error.err)
}

},











}

