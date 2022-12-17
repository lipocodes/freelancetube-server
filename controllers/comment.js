import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

export const addComment = async(req,res,next)=>{
    const newComment =  Comment({userId:req.user.id, ...req.body});
    try{
     const savedComment = await newComment.save();
     res.status(200).json(savedComment);
    }catch(err){next(err);}
}

export const deleteComment = async(req,res,next)=>{
  try{
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    (comment.userId!==user.user.id && req.user.id!==video.userId)  && res.status(403).json("You can delete only your comment!");
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment deleted!");
  }catch(err){next(err);}   
}

export const getComments = async(req,res,next)=>{
  try{
    const comments = await Comment.find({video:req.params.videoId}).limit(20);
    res.status(200).json(comments)
  }catch(err){next(err);}  
}