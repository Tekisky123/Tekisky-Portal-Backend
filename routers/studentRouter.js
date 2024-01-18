import express from 'express';
const studentRouter=express.Router();
import {createStudent,getStudent,deleteStudent,updateStudent} from '../controllers/studentController.js'

studentRouter.post('/create',createStudent)
studentRouter.get('/getstudent',getStudent)
studentRouter.put('/:id',updateStudent)
studentRouter.get('/:id',deleteStudent)
//studentRouter.get('/getstudent/:id',getStudent)



export default studentRouter