import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isMember:{
        type:Boolean,
        default:false,
        enum:['true', 'false']
    },
},{timestamps:true})

export default mongoose.model("User",UserSchema);
