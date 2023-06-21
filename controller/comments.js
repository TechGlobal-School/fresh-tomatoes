// import Comment model
const Comment = require("../models/comments");

module.exports = function (app) {
  // Create a comment
  
  app.post("/review/comments", (req, res) => {
    // title, content, reviewId
    const newComment = req.body;
 
    console.log("===================================")
    console.log(req.body)
    console.log("===================================")

    // save and then redirect
    // reviews/reviewId
    Comment.create(newComment)
      .then((response) => {
        res.redirect(`/reviews/${newComment.reviewId}`);
      })
      .catch((err) => console.log(err));
    // Save comment to database
  });

  //   Delete a comment
  app.delete("/review/comments/:id", (req, res) => {

    Comment.findByIdAndRemove(req.params.id)//i need the comment id but the req only provides us with 
      .then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
      })
      .catch((err) => console.log("err", err));
  });
};
