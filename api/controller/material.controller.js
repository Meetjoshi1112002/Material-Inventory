import Material from "../models/material.model.js";
import Student from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllMaterialsbyUser = async (req, res, next) => {
    try {
      const { uploader } = req.query;
      console.log(uploader);
  
      // Await the result of Material.find() to get the materials
      const data = await Material.find({ uploader }).populate('uploader');
  
      // Check if any materials were found
      if (data.length === 0) {
        // If no data is found, return a 404 error
        
        return res.status(404).json({ message: "No data found" });
      }
  
      // If materials are found, return them in the response
      res.status(200).json(data);
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Error fetching materials:", error);
      // Pass the error to the error handler middleware
      next(error);
    }
  };

export const getMaterials = async(req,res,next)=>{
    try{
        console.log("hi");
        const courseCode = req.query.code;
        const result = await Material.find({courseCode}).populate('uploader');
        console.log(result.length)
        res.status(200).json(result)
    }
    catch(error){
        console.log(error.message);
        next(error)
    }
}

export const addMaterial = async (req, res, next) => {
    console.log("The material is ", req.body);

    try {
        const { fileUrl, courseCode, uploader, name } = req.body;

        // Check if the uploader exists
        const existingUploader = await Student.findOne({ _id: uploader });

        if (!existingUploader) {
            next(errorHandler(404,"USER NOT FOUND"))
        }

        // Create the material document with the uploader's ObjectId
        const material = new Material({ fileUrl, courseCode,uploader, name });
        const result = await material.save();

        if (!result) {
            return next(errorHandler(500, "Material could not be uploaded"));
        }

        res.status(200).json({ message: "Material added" });
    } catch (error) {
        next(error);
    }
};
export const getAllMaterials = async(req,res,next)=>{
    try{
        const data = await Material.find().populate('uploader');
        res.status(200).json(data);

    }
    catch(error){
        next(error);
    }
}

export const deleteMaterial = async (req, res, next) => {
    try {
        const { courseCode, name } = req.body;
        const deletionResult = await Material.deleteOne({ courseCode, name });

        if (deletionResult.deletedCount === 0) {
            return next(errorHandler(404, "Material not found"));
        }

        res.status(200).json({ message: "Material deleted successfully" });
    } catch (error) {
        next(error);
    }
};
