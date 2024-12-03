import mongoose from "mongoose";

const CourseModel=new mongoose.Schema({
    courseId:{
        type:String,
        required:true,
        unique:true
    },
    courseType:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    difficultyLevel:{
        type:String,
        required:true,
        default:"easy"
    },
    courseLayout:{
        type:Object,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status:{
        type:String,
    }
},{timestamps:true})

export default mongoose.model("Course",CourseModel);