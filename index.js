import express from 'express';
import connectDB from "./mongoose.js";
import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/posts/post.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import likeRouter from "./src/features/likes/likes.routes.js";
import expressLayouts from 'express-ejs-layouts';
import ejsLayouts from "express-ejs-layouts";
import path from 'path'
import cookieParser from "cookie-parser";
const app =  express();
// EJS layouts


app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views'))
app.use(ejsLayouts)

app.use(expressLayouts)

app.use("/public/images", express.static("public/images"));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);

app.get('/',(req,res)=>{
    res.render('appear',{layout: 'layouts/layout1'});
})

app.get('/main', (req, res)=>{
    res.render('main3',{layout:'layouts/layout2', userId:req.query.userId, username:req.query.name});
})

app.get('/main2', (req, res)=>{
    res.render('main2',{layout:'layouts/layout2', userId:req.query.userId});
})

app.get('/main3', (req, res)=>{
    res.render('main',{layout:'layouts/layout2', userId:req.query.userId});
})

app.get('/error1', (req, res)=>{
    res.render('error1',  { layout: false });
})

app.get('/error2', (req, res)=>{
    res.render('error2',  { layout: false });
})






app.listen(3000, () => {
connectDB();
console.log('Listening on port 3000')
});