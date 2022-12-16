import express from "express";
import {updateUser,deleteUser,getUser,subscribeUser,unsubscribeUser,likeVideo,dislikeVideo} from '../controllers/user.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

//UPDATE USER
router.put("/:id",verifyToken,updateUser);

//DELETE USER
router.delete("/:id",verifyToken,deleteUser);

//GET USER
router.get("/find/:id",getUser);

//SUBSCRIBE USER
router.put("/sub/:id",verifyToken, subscribeUser); //id means: id of the desired channel

//UNSUBSCRIBE USER
router.put("/unsub/:id",unsubscribeUser);

//LIKE A VIDEO
router.put("/like/:videoId",verifyToken,likeVideo);

//DISLIKE A VIDEO
router.put("/dislike/:videoId",verifyToken, dislikeVideo);

export default router;