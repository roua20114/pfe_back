
const Field = require('../models/field.models')
exports.create= async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const field= new Field({
        id:req.body.id,
        name:req.body.name,
        
        

    });
     await field.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
    
};
exports.findAllField=(req,res)=>{
    Field.find().then(fields=>{
        res.send(fields);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Field.findById(req.params.id).then((field)=>{
        if(!field){
           return res.status(404).send({message:"coudln't find Field"}) 
        }
        res.send(field)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
    Field.findByIdAndDelete(req.params.id).then((field)=>{
        if(!field){
            return res.status(404).send({message:"Unexisted Field"})
        }
        res.send(field)
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
    Field.findByIdAndUpdate(req.params.id,{
        id:req.body.id,
        name:req.body.name

    }).then(field=>{
        if(!field){
            return res.statu(404).send({message:"Error" })
        }
        res.send(field);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }


