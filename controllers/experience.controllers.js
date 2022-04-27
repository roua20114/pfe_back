const Experience= require("../models/experience.models");
exports.add=async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const experience= new Experience({
        jobType:req.body.jobType,
        companyName:req.body.companyName,
        position: req.body.position,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        title: req.body.title,
        domain: req.body.domain,
        
    });
    await experience.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
};
exports.findAllExp=(req,res)=>{
    Experience.find().then(experiences=>{
        res.send(experiences);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
   Experience.findById(req.params.id).then((experience)=>{
        if(!experience){
           return res.status(404).send({message:"coudln't find experience"}) 
        }
        res.send(experience)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
    Experience.findByIdAndDelete(req.params.id).then((offer)=>{
        if(!offer){
            return res.status(404).send({message:"Unexisted experience"})
        }
        res.send(experience)
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
    Experience.findByIdAndUpdate(req.params.id,{
        jobType:req.body.jobType,
        companyName:req.body.companyName,
        position: req.body.position,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        title: req.body.title,
        domain: req.body.domain,

    }).then(experience=>{
        if(!experience){
            return res.statu(404).send({message:"Error" })
        }
        res.send(experience);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }
