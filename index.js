import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";

const connect = ()=> {
 mongoose.connect(process.env.MONGO).then(()=>console.log("Connected to MongoDB!")).catch((err)=> {throw err});   
};

const app = express();
dotenv.config();
app.listen("8800", ()=>{
    connect();
    console.log("Server is running!")
});

