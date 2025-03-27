import express from "express";
import commentC from "./comments.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
const commentRouter = express.Router();
const commentController = new commentC();


commentRouter.post("/add/:pid/:uid",jwtAuth, (req,res)=>{
    console.log(req.body.content);
    commentController.add(req,res);
});

commentRouter.put("/update/:uid/:pid/:cid",jwtAuth, (req,res)=>{
    commentController.update(req,res);
});

commentRouter.delete("/delete/:id",jwtAuth, (req,res)=>{
    commentController.delete(req,res);
});



export default commentRouter;