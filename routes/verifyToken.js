const jwt=require('jsonwebtoken')
exports.auth= (req,res,next)=>{
    const token=req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified= jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next();
    }catch(err){
        res.status(400).send('invalid token')
    }
}
exports.verifyToken=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("unauthorized req")
    }
    let token= res.headers.authorization.split(' ')[1]
    if(token=='null'){
        return res.status(401).send("unathorized req")
    }
    let payload= jwt.verify(token, process.env.TOKEN_SECRET)
    if(!payload){
        return res.status(401).send("unauthorized req")
    }
    req.userId= payload.subject;
    req.email= payload.email
    next()
}


