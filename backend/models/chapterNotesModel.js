import mongoose from "mongoose";

const ChapterNoteModel=new mongoose.Schema({
    courseId:{
        type:String,
        required:true,
    },
    chapterId:{
        type:Number,
        required:true,
    },
    notes:{
        type:String,
        required:true,
    }
},{timestamps:true})

export default mongoose.model("ChatpterNote",ChapterNoteModel);