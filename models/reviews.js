const mongoose = require("mongoose");

// Create Model
const { Schema } = mongoose;
const reviewSchema = new Schema({
  title: String,
  movieTitle: String,
  description: String,
},{timestamps: true});

const Review = mongoose.model("Review",reviewSchema );

module.exports = Review;
