import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
     empId:{type:String,unique:true,required:true},
     name:{type:String,required:true,trim:true},
     mobileNumber:{type:Number,required:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     address:{type:String,required:true},
     education:{type:String,required:true},
     date:{type:Date,required:true}
});

const userModel=mongoose.model('user',userSchema)

export default userModel