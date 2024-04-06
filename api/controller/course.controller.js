import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

export const addCourse = async(req,res,next)=>{
    const {courseCode,courseName,semester,departmentName} = req.body;
    const course = new Course({courseCode,courseName,semester,departmentName});
    const result = await course.save();
    if(!result) return next(errorHandler(500,"NO entry done"))
    console.log(result);
    res.status(200).json({message:"Ok added"})
}

export const getCourse = async(req,res,next)=>{
    const departmentName = req.params.dep;
    const semester = req.params.sem;
    const result = await Course.find({departmentName,semester})
    if(!result) return errorHandler(500,"No course found");
    res.status(200).json(result);
}