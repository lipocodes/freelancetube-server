import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";

export const signup = async(req,res,next)=>{
   try{
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password,salt);
    const newUser = new User({...req.body, password:hashedPassword}); 
    await newUser.save();
    res.status(200).json("New User added to collection User!!");
   }catch(err){
    next(err);
   }
}

export const signin = async(req,res,next)=>{
    try{
     const user = await User.findOne({name:req.body.name});
     !user && res.status(404).json("No such user!");
     const isCorrect = await bcrypt.compare(req.body.password, user.password);
     !isCorrect && res.status(404).json("Wrong credentails!");  
     res.status(200).json("Signin successfull!");
    }catch(err){next(err);}
}

export const googleAuth = (req,res,next)=>{
    res.json("gogoleAuth");
}