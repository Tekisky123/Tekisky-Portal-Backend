import express from 'express'
const userRouter=express.Router();
import { registerUser,login ,updateUser,getUser,deleteUser} from '../controllers/userController.js';

userRouter.post('/register',registerUser);
userRouter.post('/login',login);
userRouter.post('/updateuser',updateUser);
userRouter.get('/getuser',getUser);
userRouter.get('/:id',deleteUser)


export default userRouter