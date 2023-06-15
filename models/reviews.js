const mongoose = require("mongoose");

// Create Model
// const { Schema } = mongoose;
// const schema = new Schema({
//   title: String,
//   movieTitle: String,
// });

const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
  description: String,
});

module.exports = Review;
