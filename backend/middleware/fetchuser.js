var jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const JWT_SECRET='PRATIKji123';

const fetchuser=(req,res,next)=>{
    
    //get the user from the jwt token and add id to request object
    try{
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using valid token"})
    }
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
      }


}

module.exports=fetchuser;