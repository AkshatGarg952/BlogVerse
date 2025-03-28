import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },

    content: {
    type: String,
    required: true,
    },

   imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/image\/upload\/.+$/.test(v);
            },
            message: "Invalid Cloudinary image URL format"
        }
    },
    
    author:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    },

    createdAt: { 
    type: Date, 
    default: Date.now 
    },

    tags:{
        type:[String],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: "Tags array must have at least one tag."
        },
        required: true,
    },

    comments: [
        {
            _id: mongoose.Schema.Types.ObjectId, 
            text: String,
            author:String,
        }
    ],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


    });

    const Post = mongoose.model('Post', postSchema);
    export default Post;
