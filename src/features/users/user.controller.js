import userR from "./users.repository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const userRepository = new userR();
dotenv.config();
export default class userC{

    async register(req, res){
        const {name, email, password} = req.body;
        const User = {
            name:name,
            email:email,
            password:password,
        }
        
        try{
        const user = await userRepository.register(User);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

     
        res.cookie("token", token, {
        httpOnly: true, 
        secure: true,
        sameSite: "Strict", 
    });
        res.redirect(`/main?userId=${user._id}&name=${user.name}`)
        }
        catch(err){
          if(err.message=== "User already exists!"){
          res.redirect('/error2');
          }
          else{
            res.redirect('/error3');
          }
        }
    }

    async login(req, res){
        const {email, password} = req.body;
        try{
          const user = await userRepository.login(email,password);
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

          res.cookie("token", token, {
          httpOnly: true, 
          secure: true,
          sameSite: "Strict", 
      });
      res.redirect(`/main?userId=${user._id}&name=${user.name}`)
        }
        catch(err){
            if(err.message==="User not found! Please register first."){
                res.redirect('/error1');
            }
            else{
              res.redirect('/error4');
            }
           
        }
    }

    async getDetails(req, res){
        const id = req.params.id;
        try{
            const user = await userRepository.details(id);
            res.status(201).send(user);
        }
        catch(err){
            console.log(err);
            res.status(401).send("Cannot find the user!");
        }
    }


    async getAll(req, res){
        const users = await userRepository.getAll();
        res.status(201).send(users);
    }

    async update(req, res){
        const id = req.params.id;
        try{
            const newUser = await userRepository.update(id,req.body);
            res.status(201).send(newUser);
        }

        catch(err){
            console.log(err);
            res.status(401).send("Cannot update the user!");
        }

    }

    logout(req, res){
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,  // Ensure it's the same as when you set it
            sameSite: "Strict"
        });

        res.redirect("/");
    }
}
