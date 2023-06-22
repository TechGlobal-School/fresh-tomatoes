const mongoose = require("mongoose");
const { Schema } = mongoose;

const Comment = mongoose.model("Comment", {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: "Review" },
  // author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = Comment;

/*
Parent -> Review

Child -> Comment

*/
