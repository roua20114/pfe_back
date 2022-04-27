
const Msg = require('../models/msg.models')
exports.add= async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const msg= new Msg({
        content:req.body.content
        
        

    });
     await msg.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
    
};
exports.findAllmsgs=(req,res)=>{
    Msg.find().then(msgs=>{
        res.send(msgs);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Msg.findById(req.params.id).then((msg)=>{
        if(!msg){
           return res.status(404).send({message:"coudln't find Field"}) 
        }
        res.send(msg)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
    Msg.findByIdAndDelete(req.params.id).then((msg)=>{
        if(!field){
            return res.status(404).send({message:"Unexisted Message"})
        }
        res.send(msg)
    }).catch((err)=>{
        if(err.kind ==='objectId'){
            return res.status(404).send({message:"ERROR Occured" +req.params.id})
        }
        res.status(500).send({message:"error"})
    })
}


