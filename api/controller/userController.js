import httpStatus from "http-status";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const isUserAlreadyExist = async(name) => {
  let isUserExist=  await User.findOne({name})
  console.log("user name",isUserExist);
  return !!isUserExist;

}
const isUserEmailAlreadyExist = async(email) => {
    let userEmail=await User.findOne({email});
    console.log("email",userEmail);
   return !!userEmail;
}

export const createUser=async(req,res)=>{
    
    const {name,email,password}=req.body;
    let userExist=await isUserAlreadyExist(name);
    if(userExist){
        return res.status(httpStatus.NOT_ACCEPTABLE).json({error:"User name already exist"});
    }
    let userEmailExist=await isUserEmailAlreadyExist(email);
    if(userEmailExist){
        return res.status(httpStatus.NOT_ACCEPTABLE).json({error:"User Email already exist"});
    }
    let hashPassword=await bcrypt.hash(password,10);

    let newUser=new User({
        name,
        email,
        password:hashPassword
    });
   let user =await newUser.save();
   res.status(200).json({
    success:true,
    data:user
   })
    
}