import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    courseCode:{
        type:String,
        unique:true,
        required:true
    },

    courseName:{
        type:String,
        required:true
    },
    
    semester:{
        type:Number,
        required:true
    },

    departmentName:{
        type:String,
        required:true
    }

})

const Course = mongoose.model("Course",courseSchema);
export default Course;