import studentModel from "../models/studentModel.js"
import status from 'http-status'


const createStudent = async (req, res) => {
    console.log(req.body)
    const newStudent=new studentModel(req.body);
    
    try {
        const saveStudent=await newStudent.save();
        res.status(201).json(saveStudent);
        
    } catch (error) {
        res.status(400).json({message:error.message});  
    }
}




const getStudent=async(req,res)=>{
    try {
        const result = await studentModel.find();

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No students found!',
            });
        }

        return res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error while displaying students",
            error: error.message,
        });
    }
};


// const getStudent=async(req,res)=>{
//     const studentId=req.params.id;
//     try {
//         const student=await getStudentService(studentId);
//         res.json(student)
//     } catch (error) {
//         res.status(500).json({message:err.message})
//     }
// }

const deleteStudent=async(req,res)=>{
    const _id=req.params.id
    const data=await studentModel.findByIdAndDelete(_id)
    if(!data){
        return res.status(status.NOT_FOUND).json({
            success:false,
            message:"invalid id ..!"
        })
    }
    res.json({
        success:true,
        message:"student deleted successfully...!"
    })
}

const updateStudent=async(req,res)=>{
    try {
        const _id = req.params.id;
        console.log(_id);

        const student = await studentModel.findByIdAndUpdate(_id, req.body, { new: true });   //req.body typically contains the updated information sent in the request body
        //This option specifies that the method should return the modified document rather than the original one.
        // When new is set to true, 
        //the student variable will be assigned the updated document after the update operation is completed.

        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Invalid id..!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student record updated successfully...!",
            student,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error while updating record..!",
            error: error.message,
        });
    }
}

export {createStudent,getStudent,deleteStudent,updateStudent}