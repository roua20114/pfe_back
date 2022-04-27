const Contract= require("../models/contractType.models");
exports.add=async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const contract= new Contract({
        name:req.body.name

    });
    await contract.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
};
exports.findAllContracts=(req,res)=>{
    Contract.find().then(contracts=>{
        res.send(contracts);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Contract.findById(req.params.id).then((contract)=>{
        if(!contract){
           return res.status(404).send({message:"coudln't find contract"}) 
        }
        res.send(contract)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
   Contract.findByIdAndDelete(req.params.id).then((contract)=>{
        if(!contract){
            return res.status(404).send({message:"Unexisted contract"})
        }
        res.send(contract)
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
    Contract.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        

    }).then(contract=>{
        if(!contract){
            return res.statu(404).send({message:"Error" })
        }
        res.send(contract);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }
