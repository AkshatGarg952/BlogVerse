import Post from "./post.schema.js";
import User from "../users/users.schema.js";
import Comment from "../comments/comments.schema.js";
import Like from "../likes/likes.schema.js";
import mongoose from "mongoose";
export default class postR{


    async postBlog(blog, id){ 
         const user = await User.findById(id);
         if(user){
         const newBlog = Post({
            title:blog.title,
            content:blog.content,
            author:id,
            tags:blog.tags,
            imageUrl:blog.imageUrl
         })
         const savedBlog = await newBlog.save();
         user.posts.push(newBlog._id);
         await user.save();
         console.log(savedBlog);
         return savedBlog;
        }

        else{
            throw new Error("Cannot post the blog!");
        }

    }

    async updateBlog(id,blog){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(id);
            throw new Error("Invalid blog ID!");
        }
       const oldBlog = await Post.findById(id);
       if(oldBlog){
        Object.assign(oldBlog, blog);
        return await oldBlog.save();
       }
       else{
        throw new Error("Cannot find the blog!");
       }
    }

    async deleteBlog(id){
        const oldBlog = await Post.findById(id);        
        if(oldBlog){
            const userId = oldBlog.author;
             await Post.findByIdAndDelete(id);
             await User.findOneAndUpdate({ posts: id }, { $pull: { posts: id } });
             await Comment.deleteMany({post:id});
             await Like.deleteMany({post:id});
             return userId;
        }
        else{
            return new Error("Cannot find the blog!");
        }
    }

    async getAll(id){
        const allBlogs = await Post.find();

        if(allBlogs){
        return allBlogs;
        }
        throw new Error("Currently there are zero blogs!");
    }

    async get(id){
        const oldBlog = await Post.findById(id);
        if(oldBlog){
            return oldBlog;
        }
        throw new Error("No such blog exists!");
    }
    async getPostsByUser(userId) {
        const posts = await Post.find({ author:userId });
        if (posts.length >= 0) {
            console.log(posts);
            return posts;
        }
        throw new Error("No posts found for this user!");
    }

}