import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        min:5,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        min:5,
        required:true,
    }
},{timestamps:true});

const User=mongoose.model("users",userSchema)

export default User;