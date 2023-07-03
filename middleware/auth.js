const jwt =require('jsonwebtoken');
require('dotenv').config();
const key =process.env.secretKey;

const auth=(req, res, next)=>{
    const token =req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.json('Not a Autoraized User ');
    }
    jwt.verify(token ,key, function(err, ans){
        const {userID}=ans;
        req.userID=userID;
        if(ans){
            next();
        }else{
            res.status(500).json('Login to Continue!');
        }
    })
}