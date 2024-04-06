import mongoose from "mongoose"

const MaterialSchema = mongoose.Schema({
    fileUrl : {
        type:String,
        required:true,
        unique:true
    },
    courseCode:{
        type:String,
        required:true
    },
    uploader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    name:{
        type:"String"
    }
},{timestamps:true})

const Material = mongoose.model("Material",MaterialSchema)

export default Material