
const Comments = require('../models/comments.models')
const Offer= require ('../models/jobOffer.models')
exports.createCom= async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    if(req.user){
    Offer.findById(req.body.id).then(offer=>{
    const coments= new Comments({
        id:req.body.id,
        content:req.body.content,
        offer:req.body.offer
    });

     offer.comments.push(coments)
     offer.save().then(data=>{
         comments.save().then(savedComment=>{
         
        res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
})
    })
}
}



exports.findAllComs=(req,res)=>{
    Comments.find().then(comment=>{
        res.send(comment);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Comments.findById(req.params.id).then((coments)=>{
        if(!coments){
           return res.status(404).send({message:"coudln't find comment"}) 
        }
        res.send(coments)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
    Comments.findByIdAndDelete(req.params.id).then((coments)=>{
        if(!coments){
            return res.status(404).send({message:"Unexisted comment"})
        }
        res.send(coments)
    }).catch((err)=>{
        if(err.kind ==='objectId'){
            return res.status(404).send({message:"ERROR Occured" +req.params.id})
        }
        res.status(500).send({message:"error"})
    })
}
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"error"})
    }
    Comments.findByIdAndUpdate(req.params.id,{
        id:req.body.id,
        content:req.body.content,
        

    }).then(coments=>{
        if(!coments){
            return res.statu(404).send({message:"Error" })
        }
        res.send(coments);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }