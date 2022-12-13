import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import path from "path";

const connect = ()=> {
 mongoose.connect(process.env.MONGO).then(()=>console.log("Connected to MongoDB!")).catch((err)=> {throw err});   
};

const app = express();
dotenv.config();

if(process.env.NODE_ENV==="production"){
    app.use(express.static("/client/build"));
    app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "client","build", "index.html"));
   });
 }

app.listen(process.env.PORT||8800, ()=>{
    connect();
    console.log("Server is running!")
});

