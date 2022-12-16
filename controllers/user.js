import User from '../models/User.js';

export const updateUser = async(req,res,next)=>{
  //if user in cookie & URL are the same
  if(req.user.id===req.params.id){
   try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
      $set:req.body
    },{new:true});
    res.status(200).json(updatedUser);
   }catch(err){next(err);}
  }else{
    res.status(403).json("You can update only your account!");
  }
}

export const deleteUser = async(req,res,next)=>{
 if(req.user.id===req.params.id){
  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  }catch(err){next(err);}
 }else{res.status(401).json("You can delete only tour account!");}
}

export const getUser = async(req,res,next)=>{
 try{
   const user = await User.findById(req.param.id);
   res.status(200).json(user);
 }catch(err){next(err);}
}

export const subscribeUser = async(req,res,next)=>{
 if(req.user.id===req.params.id){
   try{
    await User.findById(req.user.id, {
     $push:{subscribedUsers:req.user.id},  
    });
    await User.findByIdAndUpdate(req.params.id,{
      
    });
    res.status(200).json("You are subscribed!")
   }catch(err){next(err);}
 }else{res.status(401).json("You can subscribe only yourself!");}
}

export const unsubscribeUser = async(req,res,next)=>{
  if(req.user.id===req.params.id){
   try{
    await User.findByIdAndUpdate(req.user.id, {});
    res.status(200).json("You are unsubscribed!");
   }catch(err){next(err);}
  }else{res.status(401).json("You can unsubscribe only yourself!");}
}

export const likeVideo = async(req,res,next)=>{
 if(req.user.id===req.params.id){
  try{
   await User.findByIdAndUpdate(req.user.id, {});
   res.status(200).json("Video liked!");
  }catch(err){next(err);}
 }else{res.status(401).json("You can only like a video for yourself!")}
}

export const dislikeVideo = async(req,res,next)=>{
  if(req.user.id===req.params.id){
    try{
     await User.findByIdAndUpdate(req.user.id,{});
     res.status(200).json("Video disliked!");
    }catch(err){next(err);}
  }else{res.status(401).json("You can only dislike a video for yourself!")} 
}

