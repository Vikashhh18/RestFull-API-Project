require('dotenv').config()  

const express= require('express');
const path=require('path');
const app=express();
const {v4:uuidv4}=require('uuid');
const methodOveride=require('method-override');


// use middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOveride("_method"));

//ejs temple set up
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// use public folder for style or any other file like js
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        user: "VickySharma176",
        content: "I'm Vikash, and I love coding! Currently diving deep into Data Structures and Algorithms. 🚀 #CodingLife"
    },
    {
        id: uuidv4(),
        user: "AnshuSharma176",
        content: "Hello, world! Just started learning JavaScript. Any tips for a beginner? 🤔 #WebDevelopment"
    },
    {
        id: uuidv4(),
        user: "LapakSharma176",
        content: "I am Lapak! 💪 Mastering React and building some cool projects. Stay tuned! #FrontendDev"
    },
    {
        id: uuidv4(),
        user: "CodeMaster007",
        content: "Finally solved a tricky LeetCode problem! Debugging is fun when you figure it out. 😎 #ProblemSolving"
    },
    {
        id: uuidv4(),
        user: "AI_Explorer",
        content: "Just trained my first AI model in Python! The future is here. 🚀 #MachineLearning"
    }
];


app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("create.ejs");
})

app.post("/posts/new",(req,res)=>{
    const {user,content}=req.body;
    const id=uuidv4();
    posts.push({id,user,content});
    res.redirect('/posts');
})

app.patch("/posts/:id",(req,res)=>{
    const newContent=req.body.content;
    const {id}=req.params;
    const post=posts.find((p)=>p.id==id);
    post.content=newContent;
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((p)=>p.id==id);
    res.render("show.ejs",{post});
})

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id); // ✅ Correctly reassigning
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((p)=>p.id==id)
    res.render("edit.ejs",{post});
})

app.listen(process.env.PORT,()=>{
    console.log(`Server will started at port ${process.env.PORT}`);
})