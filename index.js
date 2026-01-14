const express = require("express");
const app = express();
const port = 8080;
const path = require("path")
const { v4: uuidv4 } = require("uuid");
//to generate random id
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//to override HTTP verbs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended : true }));

let posts = [
    {
       id : uuidv4(),
       username : "nisha",
       content : "I love coding"
    },
    {
       id : uuidv4(),
       username : "prakshal",
       content : "I love gyming"
    },
    {
       id : uuidv4(),
       username : "xyz",
       content : "I love sleeping"
    },
    {
       id : uuidv4(),
       username : "abc",
       content : "I love eating"
    }
]
app.get("/posts", (req, res) => {
    res.render("posts.ejs", { posts } );
})

//ADD NEW  POST
// To get the data
app.get("/posts/new", (req, res) => {
   res.render("new.ejs");
})
// to post the data in db
app.post("/posts/new", (req, res) => {
   id = uuidv4();
   let { username, content } = req.body;
   posts.push({id, username, content});
   res.redirect("/posts");
})

// TO SEE POST IN DETAIL
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

//TO EDIT A POST
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
   let { id } = req.params;
   let  newContent  = req.body.content;
   let post = posts.find((p) => p.id === id);
   post.content = newContent;
   res.redirect("/posts")
})
//TO DELETE A POST
app.listen(port, () => {
    console.log(`${port} is listening`)
})