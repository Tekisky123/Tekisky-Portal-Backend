import userModel from "../models/userModel.js";
import { registerUserService ,getUserService} from "../services/userService.js";
import { getToken,checkPassword,verifyToken ,passwordHash } from "../authentication/userAuth.js";

let registerUser=async(req,res)=>{
    let{empId,name,mobileNumber,email,password,address,education,date}=req.body;
    try {
       let hashpassword=await passwordHash(password)
       let status=await registerUserService(empId,name,mobileNumber,email,hashpassword,address,education,date) 
       if (status=='success'){
        let token=await getToken(email)
        res.status(200).send('success')
       }else{
        res.status(501).send('error')
       }
    } catch (error) {
        console.log(error)
        console.log('error in controller');
    }
}

let login=async(req,res)=>{
    let {empId,password}=req.body;
    try {
        let user=await getUserService(empId)
        let status=await checkPassword(password,user.password)
        if(status){
            let token=getToken(empId)
            res.status(200).send({status:"success",token:token,data:user});
        }else{
            res.status(401).send("invalid login");
        }
    } catch (error) {
        console.log(error);
    }
};

let updateUser=async(req,res)=>{
   try {
    let {empId,name,mobileNumber,email,password,address,education,date}=req.body;
    const data=await userModel.findOneAndUpdate({empId},{empId,name,mobileNumber,email,password,address,education,date})

    return res.status(201).json({
        success:true,
        message:"User Record Updated Successfully....!"
    })
   } catch (error) {
      return res.status(404).json({
        success:false,
        message:"Error Occured During Update User...!",
        error:error.message
      })
   }
};

let getUser=async(req,res)=>{
    try {
        const data=await userModel.find()

        if(!data) return res.status(404).json({
            success:false,
            message:"There Is No Users....!"
        })
        return res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success:false,
            message:"Error While Displaying Users...!",
            error:error.message
        })
    }
};


let deleteUser=async(req,res)=>{
    const _id=req.params.id;
    const data=await userModel.findByIdAndDelete(_id)
    if(!data){
        return res.status(status.NOT_FOUND).json({
            success:false,
            message:"Invalid Id..."
        })
    }
    res.json({
        success:true,
        message:"User Deleted Successfully.."
    })
}

export {registerUser,login,updateUser,getUser,deleteUser}