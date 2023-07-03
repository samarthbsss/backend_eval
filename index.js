const express = require('express');
const mongoose = require('mongoose');
const {connection} = require('./config/db');
const port =process.env.PORT
const app =express();
const cors = require('cors');
const userRoute= require('./routes/users');
const todoRoute= require('./routes/todos');

app.use(cors());
app.use(express.json());

app.use('/users', userRoute);
app.use('/todos', todoRoute);


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