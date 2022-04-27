const Test= require("../models/cv.models");
exports.add=async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const test= new Test({
        title:req.body.title,
        description:req.body.description,
        mark: req.body.mark,
                       
        
    });
    await test.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
};
exports.findAlltest=(req,res)=>{
    Test.find().then(tests=>{
        res.send(tests);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Test.findById(req.params.id).then((test)=>{
        if(!test){
           return res.status(404).send({message:"coudln't find cv"}) 
        }
        res.send(test)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
   Test.findByIdAndDelete(req.params.id).then((test)=>{
        if(!test){
            return res.status(404).send({message:"Unexisted cv"})
        }
        res.send(test)
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
   Test.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        mark: req.body.mark,

    }).then(test=>{
        if(!test){
            return res.statu(404).send({message:"Error" })
        }
        res.send(test);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }
