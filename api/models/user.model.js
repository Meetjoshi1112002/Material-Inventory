import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    departmentName:{
        type:String,
        required:true
    },
    semester:{
        type:Number
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

const Student = mongoose.model("Student",StudentSchema);
export default Student;