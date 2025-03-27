import express from "express";
import userC from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const userRouter = express.Router();
const userController = new userC();

userRouter.post("/register", (req,res)=>{
    userController.register(req,res);
});

userRouter.post("/login", (req,res)=>{
    userController.login(req,res);
});

userRouter.get("/details/:id", jwtAuth, (req,res)=>{
    userController.getDetails(req,res);
});

userRouter.get("/details", jwtAuth, (req,res)=>{
    userController.getAll(req,res);
});

userRouter.put("/update/:id", jwtAuth, (req,res)=>{
    userController.update(req,res);
});

userRouter.get("/logout", jwtAuth, (req, res)=>{
   userController.logout(req, res);
})

export default userRouter;