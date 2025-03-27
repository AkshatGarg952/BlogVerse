import Comment from "./comments.schema.js";
import User from "../users/users.schema.js";
import Post from "../posts/post.schema.js";
export default class commentR{

    async add(content, uid, pid){
        const comment = Comment({
            content:content,
            user:uid,
            post:pid
        })
        await comment.save();

        const user = await User.findById(uid);
        if (!user.comments){ user.comments = [];
        }
        user.comments.push(comment._id);
        await user.save();

        const post = await Post.findById(pid);
        if (!post.comments){ post.comments = [];
        }
        post.comments.push({_id:comment._id,
            text:content,
            author:user.name
        });

        await post.save();
        return post;
    }

    async get(id){
        const comment = await Comment.findById(id);
        if(comment){
            return comment;
        }
        throw new Error("Comment not found!");
    }

    async delete(id){
        const comment = await Comment.findByIdAndDelete(id);
        if(comment){
            await User.findOneAndUpdate({comments:id},{ $pull: { comments: id }});
            await Post.findOneAndUpdate({comments:id},{ $pull: { comments: id }});
            return comment;

        }
        throw new Error("Comment not found!");
    }

    async update(uid, pid, cid, newComment){
        const comment = await Comment.findById(cid);
        if(comment && comment.post.equals(pid) && comment.user.equals(uid)){
            Object.assign(comment,newComment );
            return await comment.save();
        }

        throw new Error("Not foudn!");
    }
}