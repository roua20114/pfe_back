const Candidacy= require("../models/candidacy.models");
exports.add=async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const candidacy= new Candidacy({
        duration:req.body.duration

    });
    await candidacy.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
};
exports.findAllCandadicies=(req,res)=>{
    Candidacy.find().then(candidacis=>{
        res.send(candidacis);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Candidacy.findById(req.params.id).then((contract)=>{
        if(!candidacy){
           return res.status(404).send({message:"coudln't find candadicy"}) 
        }
        res.send(candidacy)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
   Candidacy.findByIdAndDelete(req.params.id).then((candadicy)=>{
        if(!candidacy){
            return res.status(404).send({message:"Unexisted contract"})
        }
        res.send(candadicy)
    }).catch((err)=>{
        if(err.kind ==='objectId'){
            return res.status(404).send({message:"ERROR Occured" +req.params.id})
        }
        res.status(500).send({message:"error"})
    })
}
