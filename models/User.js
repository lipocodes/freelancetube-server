import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
 name: {
   type:String, 
   required:true,
   unique:true
 },
 email: {
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:false,
    unique:false
 },
 img:{
    type:String,
    required:false,
    unique:false
 },
 subscribers:{
 type:Number,
 required:false,
 unique:false,
 default:0
 },
 subscribedUsers:{
   type:[String],
   required:false,
   unique:false,
   default:[]
 },
 fromGoogle:{
   type: Boolean,
   required:false,
   inique:false,
   default:false
 }
},{timestamps:true});

export default  mongoose.model("User",UserSchema);