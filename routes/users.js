const express= require('express');
const router = express.Router();
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const User= require('../model/user.model');
const verifyToken =require('../middleware/verifytoken');
// const e = require('express');
require('dotenv').config();


router.get('/profile', async (req, res)=>{    
    try {
            const user = await User.find();
            res.json(user);
    } catch (error) {
            res.status(500).send('Error getting users');
    }
    })

// for regist
router.post('/register',(req, res)=>{
    const {email, password ,ipAddress}= req.body;

    const newUser= new User({
        email,
        password:bcrypt.hashSync(password,8),
        ipAddress,
    });
     newUser.save();
     res.json({msg:'New User is Registered!'});

})

router.post('/login', async (req, res)=>{
   const {email , password} = req.body;
   const user = await User.findOne({email});
    if(!user){
        res.send({msg:'User not Found please register'});
    }else{
        const hash= user.password;
        console.log(hash);
        const decyptedpass =bcrypt.compareSync(password, hash);
        if(decyptedpass){
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

module.exports = router
