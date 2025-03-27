import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
      },

    password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters']
      },

      bio:{
        type: String,
        default:"",
      },

      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],

      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

       likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    });

    const User = mongoose.model('User', userSchema);
    export default User;