import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required:true },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
    });

    const Like = mongoose.model('Like', likeSchema);
    export default Like;