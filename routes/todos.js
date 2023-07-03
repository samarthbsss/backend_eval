const express= require('express');
const router = express.Router();
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const verifyToken =require('../middleware/verifytoken');
const Todo = require('../model/todo.model');

router.get('/', verifyToken,async(req, res)=>{
    try {
        const user = await Todo.find();
        res.json(user);
   } catch (error) {
        res.status(500).send('Error getting todos');
   }

})

router.post('/create', verifyToken, async(req, res)=>{
    try {
        const {taskname, status, tag}= req.body;
     const todo= new Todo({
        taskname,
        status,
        tag,
        // user req.user._id,
   })
   await todo.save();
   res.send('Todo has been created!')
    } catch (error) {
        res.send('creation of todo failed',error)
    }
   

});

router.post('/:id', verifyToken , async(req, res)=>{
    try {
        const {taskname, status, tag, user}= req.body;
        const  todo = await Todo.findIdAndUpdate(
            req.params.id,
            {taskname, status, tag, user},
            {new :true}
        );
        if(!todo){
            return res.status(404).send('Todo not found');
        }
        res.send('Todo has been updated');
    } catch (error) {
        res.status(500).send('Eroor updating');
    }
})

router.post('/:id' , async (req, res)=>{
    try {
        const  todo = await Todo.findIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).send('Todo not found');
        }
        res.send('Todo has been deleted');
    } catch (error) {
        res.status(500).send('Eroor updating');
    }
})
module.exports= router;
