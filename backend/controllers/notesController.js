import ChatpterNote from "../models/chapterNotesModel.js";

export const getAllNotes=async(req,res)=>{
    try{
        const courseId=req.params.courseId;
        const getAllNotesResponse=await ChatpterNote.find({
            courseId:courseId,
        })
        res.status(201).json({
            message:"All notes fetched successfully",
            notes:getAllNotesResponse,
        });
    }catch(err){
        console.error("Error getting all notes:",err.message);
        return res.status(500).json({error:err.message});
    }
}