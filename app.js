const express = require("express");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require('mongoose');
main().catch(err => console.log(err));

const { getHome, getAbout, getContact, compose, getArticle, postArticle } = require("./controllers/blog.controller")

async function main() {
  await mongoose.connect('mongodb+srv://mark:Dj3Hfhdi7jrhf5dvda34g@cluster0.z8zd9.mongodb.net/todoList');
}

const app = express();

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/home", getHome)

app.get("/about", getAbout)

app.get("/contact", getContact)

app.get("/compose", compose)

app.get("/posts/:post", getArticle)

app.post("/compose", postArticle)

app.get("/*", function(req, res) {
  res.redirect("/home")
})


let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});