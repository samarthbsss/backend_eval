const express = require('express');
const mongoose = require('mongoose');
const {connection} = require('./config/db');
const port =process.env.PORT
const app =express();
const cors = require('cors');
const userPath= require('./routes/users');
const User= require('./model/user.model');
const empPath =require('./routes/emp');



app.use(cors());
app.use(express.json());



app.use('/user', userPath);

app.use('/employees', empPath);

// app.post('/signup', (req, res)=>{
//     // try {
//      const{email, password}= req.body;
 
//      const user = new User({
//       email,
//       password,
//      });
//     user.save();
//      res.json({message:'New User is Signup Success!'});
     
//     // } catch (error) {
//     //  console.log('Something is wrong', error);
//     // }
// });

// app.get('/',(req, res)=>{
//     res.send('This is the main page');
// })


app.listen(port, async ()=>{
    try {
       await connection;
       console.log('Connected to server'); 
    } catch (error) {
        console.log(error);
    }
                                                                                                                                                                                                                                     
    console.log(`listening to server  ${port}`)
})