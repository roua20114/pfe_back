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
    let token = req.headers["authorization"];
    console.log(token);
    token = token.slice(7, token.length);
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            status: false,
            msg: "token is invalid",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        status: false,
        msg: "Token is not provided",
      });
    }
}


