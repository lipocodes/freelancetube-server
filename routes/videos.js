import express from 'express';
import { addVideo, deleteVideo, getVideo, updateVideo,addView,trend,random,sub,getByTag,search } from '../controllers/video.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

//CREATE A VIDEO
router.post("/",verifyToken, addVideo );
router.put("/:id", verifyToken,updateVideo);
router.delete("/:id", verifyToken,deleteVideo);
router.get("/:id",getVideo);

router.put("/view/:id",addView);
router.get("/trend",trend);
router.get("/random",random);
router.get("/sub",verifyToken, sub);
router.get("/tags",getByTag);
router.get("/search",search);

export default router;
