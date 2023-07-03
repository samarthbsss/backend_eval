const mongoose = require('mongoose');

const todoSchema= mongoose.Schema({
 taskname:{
    type:String,
    required: true,
  } ,
  status:{
    type:String,
    enum:['pending','done'],
    default:'pending'
  },
  tag:{
    type:String,
    enum:['personal','offical','family'],
    // default:'pending'
    required:true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  }
})

const Todo= mongoose.model('Todo', todoSchema);

module.exports =Todo;
