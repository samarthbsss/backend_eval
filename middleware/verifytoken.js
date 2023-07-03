const jwt =require('jsonwebtoken');
require('dotenv').config();

const verifyToken=(req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json('Acess denied!');
    }

    jwt.verify(token, process.env.secretKey , function(err, decoded){
    
        const {userId}= decoded;
        req.userId =userId;
        if(decoded){
            next();

        }
        else{
            res.send("Please login!")
        }
    });
}

module.exports= verifyToken;