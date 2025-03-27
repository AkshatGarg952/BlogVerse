import express from "express";
import likeC from "./like.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const likeRouter = express.Router();
const likeController = new likeC();


likeRouter.get("/add/:pid/:uid",jwtAuth, (req,res)=>{
    likeController.add(req,res);
});

likeRouter.get("/remove/:pid/:uid",jwtAuth, (req,res)=>{
    
    likeController.remove(req,res);
});




export default likeRouter;