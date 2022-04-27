const Cv= require("../models/cv.models");
exports.add=async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const cv= new Cv({
        name:req.body.name,
        url:req.body.url
        
    });
    await cv.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
};
exports.findAllcv=(req,res)=>{
    Cv.find().then(experiences=>{
        res.send(experiences);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    CV.findById(req.params.id).then((experience)=>{
        if(!experience){
           return res.status(404).send({message:"coudln't find cv"}) 
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
   CV.findByIdAndDelete(req.params.id).then((cv)=>{
        if(!cv){
            return res.status(404).send({message:"Unexisted cv"})
        }
        res.send(cv)
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
   CV.findByIdAndUpdate(req.params.id,{
     name:req.body.name,
        url:req.body.url

    }).then(cv=>{
        if(!cv){
            return res.statu(404).send({message:"Error" })
        }
        res.send(cv);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }
