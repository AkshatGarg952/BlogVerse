import express from "express";
import postC from "./post.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
import {uploadFile} from "../../middleware/multer.middleware.js";

const postRouter = express.Router();
const postController = new postC();

postRouter.get("/add/:id", jwtAuth, (req,res)=>{
    postController.getadd(req,res);
});

postRouter.post("/add/:id",jwtAuth, uploadFile.single('thumbnail'), (req,res)=>{
    postController.add(req,res);
});
postRouter.get("/update/:id",jwtAuth, (req,res)=>{
    postController.getupdate(req,res);
});

postRouter.post("/postupdate/:id",jwtAuth, uploadFile.single('thumbnail'), (req,res)=>{
        postController.update(req, res);
});

postRouter.get("/delete/:id",jwtAuth, (req,res)=>{
    postController.deleteBlog(req,res);
});
postRouter.get("/getAll/:id",jwtAuth, (req,res)=>{
    postController.getAll(req,res);
});
postRouter.get("/get/:id",jwtAuth, (req,res)=>{
    postController.get(req,res);
});
postRouter.get("/geet/:id",jwtAuth, (req, res)=>{
    postController.geet(req, res);
})

postRouter.get("/getAllpbyUser/:id",jwtAuth, (req, res)=>{
    postController.getAllPostsByUser(req, res);
})

postRouter.get("/getAllbyUser/:id",jwtAuth, (req, res)=>{
    postController.getPostsByUser(req, res);
})

postRouter.get("/updated", jwtAuth, (req, res)=>{
    postController.updated(req, res);
})


export default postRouter;