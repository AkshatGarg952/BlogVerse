import Like from "./likes.schema.js";
import User from "../users/users.schema.js";
import Post from "../posts/post.schema.js";
export default class likeR{

    async add(pid, uid){
        const like = Like({
            user:uid,
            post:pid
        })
        await like.save();

        const user = await User.findById(uid);
                if (!user.likes){ user.likes = [];
                }
                user.likes.push(like._id);
                await user.save();
        
                const post = await Post.findById(pid);
                if (!post.likes){ post.likes = [];
                }
                post.likes.push(uid);
                await post.save();
    }

    async remove(pid, uid){
         const like = await Like.findOne({post:pid , user:uid});
         if(like!=null){
         await Like.findByIdAndDelete(uid);

         await Post.findByIdAndUpdate(
            pid,
            { $pull: { likes: uid } }, 
            { new: true }
        );

        await User.findByIdAndUpdate(
            uid,
            { $pull: { likes: like._id } }, 
            { new: true }
        );
    }
                
    }

    
}