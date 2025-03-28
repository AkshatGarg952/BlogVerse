import postR from "./post.repository.js";

const postRepository = new postR();
export default class postC{

    getadd(req, res){
        res.render('newBlog',{layout:'layouts/layout2', userId:req.params.id});
    }

    async add(req, res){
        const {title,content,tags} = req.body;
        const imageUrl = req.file.path;
        const blog = {
            title:title,
            content:content,
            tags:tags,
            imageUrl:imageUrl
        }

        try{
         const savedBlog = await postRepository.postBlog(blog,req.params.id);
         console.log(savedBlog);
         res.redirect(`/main2?userId=${savedBlog.author}`);
        }
        catch(err){
            console.log(err);
            res.status(401).send(err);
        }
    }

    async getupdate(req, res){
        
        const id = req.params.id;
        console.log(id);
        try{        
            const blog = await postRepository.get(id);
            res.render('update', {layout:'layouts/layout2', blog:blog, userId:blog.author})
        }

        catch(err){
            res.status(401).send("No such blog exists!");
        }
        
        
    }

    async update(req, res){
        const id = req.params.id;
        try{     
            const {title, content,tags} = req.body;
            const blog = {
                title:title,
                content:content,
                tags:tags
            }
            if(req.file){
                const imageUrl = `https://blogverse-ye3t.onrender.com/public/images/${req.file.filename}`;
                blog.imageUrl = imageUrl
            }

            
            console.log(id);
            const updatedBlog = await postRepository.updateBlog(id,blog);

            res.redirect(`/api/posts/updated?blogId=${updatedBlog._id}`)
            // res.render('details',{layout:'layouts/layout2', blog:updatedBlog, userId:updatedBlog.author})
        }
        catch(err){
            console.log(err);
            res.status(401).send("No such blog exists!");
        }
    }

    async updated(req, res){
        try {
            const blog = await postRepository.get(req.query.blogId);
    
            if (!blog) {
                return res.status(404).send("Blog not found");
            }
    
            res.render('details', { layout: 'layouts/layout2', blog, userId: blog.author });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }

    async deleteBlog(req, res){
        const id = req.params.id;
        try{
            const userId = await postRepository.deleteBlog(id);
            console.log(userId);
            res.redirect(`/main2?userId=${userId}`)
        }
        catch(err){
            res.status(401).send("Blog is not present to be deleted!");
        }
    }

    async getAll(req, res){
        try{
            const blogs = await postRepository.getAll(req.params.id);
            res.status(201).send(blogs);
         }
         catch(err){
            console.log(err);
            res.status(401).send("No blogs are present!");
         }
    }

    async get(req, res){
        const id = req.params.id;
        try{
            const blog = await postRepository.get(id);
            res.render('details',{layout:'layouts/layout2', blog:blog, userId:blog.author})
        }

        catch(err){
            console.log(err);
            res.status(401).send("No such blog present");
        }
    }

    async geet(req, res){
        const id = req.params.id;
        try{
            const blog = await postRepository.get(id);
            res.render('details2',{layout:'layouts/layout2', blog:blog, userId:blog.author})
        }

        catch(err){
            console.log(err);
            res.status(401).send("No such blog present");
        }
    }

    async getPostsByUser(req, res) {
        const userId = req.params.id;
        try{
            const posts = await postRepository.getPostsByUser(userId);
            res.status(201).send(posts);
            // res.render('main2',{layout:'layouts/layout2', userId:userId, posts:posts})
        }
        catch(err){
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAllPostsByUser(req, res) {
        const userId = req.params.id;
        try{
            const posts = await postRepository.getPostsByUser(userId);
    
            res.render('main2',{layout:'layouts/layout2', userId:userId, posts:posts})
        }
        catch(err){
            res.status(500).json({ error: "Internal server error" });
        }
    }

    
    

    

}
