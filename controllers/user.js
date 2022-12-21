import User from '../models/User.js';
import Video from '../models/Video.js';

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

export const getUser = async (req, res, next) => {
  try {
    const user = await User.find({name: req.params.id});
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribeUser = async (req, res, next) => { console.log("aaaaaaaaaaaaaaa");
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribeUser = async (req, res, next) => { console.log("bbbbbbbbbbbbbbbbb");
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async(req,res,next)=>{
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
 
}

export const dislikeVideo = async(req,res,next)=>{
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{dislikes:id},
      $pull:{likes:id}
    })
    res.status(200).json("The video has been disliked.")
} catch (err) {
  next(err);
}
  
}

