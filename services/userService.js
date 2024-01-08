import userModel from "../models/userModel.js";

let registerUserService=async(empId,name,mobileNumber,email,password,address,education,date)=>{
    try {
        let user=new userModel({empId,name,mobileNumber,email,password,address,education,date});
        await user.save();
        return "success"
    } catch (error) {
        console.log(error);
        return "error"
    }
}
let getDbPassword=async(empId)=>{
    try {
        let user=await userModel.findOne({empId});
        let dbPass=user.password;
        return dbPass;
    } catch (error) {
        console.log(error);
    }
}

let getUserService=async(empId)=>{
    try {
        let user=await userModel.findOne({empId});
        return user;
    } catch (error) {
        console.log(error);
    }
}

export {registerUserService,getUserService,getDbPassword}