const express= require('express');
const router = express.Router();
// const bcrypt =require('bcrypt');
// const jwt=require('jsonwebtoken');
const auth =require('../middleware/auth');
const Employee = require('../model/emp.model');
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      console.error('Error retrieving employees:', error);
      res.status(500).json({ error: 'Failed to retrieve employees' });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const employee = new Employee(req.body);
      console.log(req.body);
      await employee.save();
      res.json(employee);
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ error: 'Failed to create employee' });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
      res.json(employee);
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    }
  });
  
 router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Employee.findByIdAndDelete(id);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  });

  module.exports =router;