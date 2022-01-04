const mongoose = require("mongoose");
const _ = require("lodash")

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const postSchema = { title: String, content: String };

const Post = mongoose.model("Post", postSchema);

function getHome(req, res) {
  Post.find({}, function (err, docs) {
    console.log(docs);
    if (err) {
      console.log(err);
    }
    res.render("home", {homeStartingContent: homeStartingContent, posts: docs})
  })
}

function getAbout(req, res) {
  res.render("about", { aboutContent: aboutContent });
}

function getContact(req, res) {
  res.render("contact", { contactContent: contactContent });
}

function compose(req, res) {
  res.render("compose");
}

function getArticle(req, res) {
  let requestedPost = _.lowerCase(req.params.post);
  
  Post.find({}, function (err, posts) {
    posts.forEach((post) => {
      if (requestedPost === _.lowerCase(post.title)) {
        res.render("post", {
          postTitle: _.toUpper(post.title),
          postContent: post.content,
        });
      } else {
        console.log("not match");
      }
    });
  })
}

function postArticle(req, res) {
  async function createNewPost() {
    const newPost = new Post({ title: req.body.postTitle, content: req.body.postBody})
    await newPost.save();
  }
  createNewPost()
  res.redirect("/home");
}

module.exports = {
  getHome,
  getAbout,
  getContact,
  compose,
  getArticle,
  postArticle,
};
