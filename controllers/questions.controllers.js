const Questions= require("../models/questions.models");
exports.add=async(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Error occured"})
    }
    const question= new Questions({
        title:req.body.title,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer: req.body.answer,
                       
        
    });
    await question.save().then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "something is wrong"})})
};
exports.findAllquestions=(req,res)=>{
    Questions.find().then(questions=>{
        res.send(questions);
    }).catch(err=>{
        res.status(500).send({message:"error"})
    });


}
exports.findById=(req,res)=>{
    Questions.findById(req.params.id).then((question)=>{
        if(!question){
           return res.status(404).send({message:"coudln't find question"}) 
        }
        res.send(question)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
   Questions.findByIdAndDelete(req.params.id).then((question)=>{
        if(!question){
            return res.status(404).send({message:"Unexisted cv"})
        }
        res.send(question)
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
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer: req.body.answer,

    }).then(question=>{
        if(!question){
            return res.statu(404).send({message:"Error" })
        }
        res.send(question);
    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error " +req.params.id})
        }
        return res.status(500).send({message:"error" +req.params.id});

    })

    }
