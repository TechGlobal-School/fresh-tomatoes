// import Comment model
const Comment = require("../models/comments");

module.exports = function (app) {
  // Create a comment
  app.post("/review/comments", (req, res) => {
    // title, content, reviewId
    const newComment = req.body;
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
    console.log("req.params", req.params.id);
    res.send("Deleted"); // replace this with redirect
  });
};
