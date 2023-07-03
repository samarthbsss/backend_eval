const express= require('express');
const router = express.Router();
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const User =require('../model/user.model');
const auth =require('../middleware/auth');
require('dotenv').config();

router.get('/',(req, res)=>{
    res.send('Hello!');
})

// res.send('/login',(re))

router.post('/signup', (req, res)=>{
   try {
    const{email, password}= req.body;

    const user= new User({
     email,
     password:bcrypt.hashSync(password,8),
    });
   user.save();
    res.status(200).json({message:'New User is Signup Success!'});
    
   } catch (error) {
   res.send('Something is wrong', error);
   }
   
})

router.post('/login',async (req, res)=>{
    const {email, password} =req.body;
    const user= await User.findOne({email});
    if(!user){
        res.send({msg:"User not Found"});
    }
    else{
        const hash=user.password;
        console.log(hash, 'this is the password');
        const pass =bcrypt.compareSync(password, hash);
        // Image
        if(pass){
            const token =jwt.sign({userId: user._id}, process.env.secretKey);
            res.send({
                msg:'Login Successfull',
                user:email,
                token:token,
            })
        }else{
            res.send({msg:'password did not match'});
        }
    }
})

module.exports =router;