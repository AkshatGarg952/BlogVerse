import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
    type: String,
    required: true,
    },
    
    createdAt: { 
    type: Date, 
    default: Date.now 
        },

    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    });

    const Comment = mongoose.model('Comment', commentSchema);
    export default Comment;