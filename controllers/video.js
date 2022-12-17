import Video from '../models/Video.js';
import User from '../models/User.js';

export const addVideo = async(req,res,next)=>{
    const newVideo = new Video({
        userId: req.user.id,
        ...req.body
    });  
  try{
   const savedVideo =  await newVideo.save();
   res.status(200).json(savedVideo);
  }catch(err){next(err);}
}

export const updateVideo = async (req,res,next)=>{
    try{
      const video  = await Video.findById(req.params.id);
      !video && res.status(401).json("No such video!");
      const userId = video.userId;
      (userId!=req.user.id)  && res.status(403).json("You can update only your videos!");
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },{new:true});
      res.status(200).json(updatedVideo);
    }catch(err) {next(err);}
}

export const deleteVideo = async(req,res,next)=>{
    try{
      const video  = await Video.findById(req.params.id);
      !video && res.status(403).json("No such video!");
      (video.userId!=req.user.id) && res.status(403).json("You can delete only your videos");
      Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video deleted!");
    }catch(err) {next(err);}
}

export const getVideo = async(req,res,next)=>{
    try{
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    }catch(err){next(err);}
}

export const addView = async(req,res,next)=>{
    try{
     await Video.findByIdAndUpdate(req.params.id, {
        $inc: {views:1}
     });
     res.status(200).json("View incremented!");
    }catch(err){next(err);}
}

export const trend = async(req,res,next)=>{
    try{
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    }catch(err){next(err);}
}

export const random = async(req,res,next)=>{
    try{
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    }catch(err){next(err);}
}

export const sub = async(req,res,next)=>{
    try{
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedChannels;
      
      const list = await Promise.all(
        subscribedChannels.map((channelId)=>{
           return Video.find({userId:channelId}) 
        })
      );
      res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt));  
    }catch(err){next(err);}
}



export const getByTag = async(req,res,next)=>{
    const tags = req.query.tags.split("&") ;
 try{
   const videos = await Video.find({tags:{$in:tags}}).limit(20);
 }catch(err){next(err);}
}



export const search = async(req,res,next)=>{
  const query = req.query.q;  
 try{
  const res = await Video.find({title: {$regex:query, $option:"i"}}).limit(40);
 }catch(err){next(err);}
}






