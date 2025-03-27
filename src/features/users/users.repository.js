import User from "./users.schema.js";
import bcrypt from 'bcrypt';
export default class UserR{

    async register (user){
        const old = await User.findOne({email:user.email});
        if(old){
            throw new Error("User already exists!");
        }
       const newUser = new User({
           name:user.name,
           password:user.password,
           email:user.email,
       })

       try{
        await newUser.validate();
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const savedUser = await newUser.save();
        console.log("You have been registered successfuly!")
        return savedUser;
       }
       catch(err){
       console.error("Error saving user : ", err);

       throw err;
    }
    }

    async login(email, pass){
        const user = await User.findOne({ email: email }); 
        if (!user) {
            throw new Error("User not found! Please register first.");
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials! Please check your email or password.");
        }
        return user; 
    }

    async details(id){
        const user = await User.findById(id);
        if(user){
            return user;
        }
        else{
            throw new Error("Cannot find the given user!");        
        }
    } 

    async getAll(){
        return await User.find();
    }

    async update(id, user){
        const userF = await User.findById(id);
        if(userF){
        Object.assign(userF, user);
         const updatedUser = await userF.save();
         return updatedUser;
        }
        else{
            throw new Error("User hi nahi hai to bc update kya karu!");
        }
    }
}
