const express = require("express");
const { engine } = require("express-handlebars");
require("dotenv").config();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const connectToDB = require("./config/db");

const app = express();

// Database connection
connectToDB();

// middlware
app.use(express.json()); // Parses incoming req.body json
app.use(express.urlencoded({ extended: true })); // Parses incoming req.body encoded data
app.use(methodOverride("_method")); // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

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

// Routes

// Get all reviews
app.get("/", (req, res) => {
  Review.find()
    .lean()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => console.log("err", err));
});

// Get add review form
app.get("/reviews/new", (req, res) => {
  res.render("reviews-new", { heading: "Add Review" });
});

// Create a review
app.post("/reviews", (req, res) => {
  const newReview = req.body;
  Review.create(newReview)
    .then((response) => {
      if (response?.title !== "") {
        res.redirect("/");
      } else {
        throw new Error("Error while creating a review");
      }
    })
    .catch((err) => console.log(err));
});

// Show a single review
app.get("/reviews/:id", (req, res) => {
  const reviewId = req.params.id;
  Review.findById(reviewId)
    .lean()
    .then((review) => {
      // console.log("review", review);
      res.render("review-show", { review: review });
    })
    .catch((err) => console.log(err));
});

// Get edit form
app.get("/reviews/:id/edit", (req, res) => {
  Review.findById(req.params.id)
    .lean()
    .then((review) => {
      res.render("reviews-edit", { review: review, heading: "Edit Review" });
    })
    .catch((err) => console.log(err));
});

// Edit a single review
app.put("/reviews/:id", (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;
  Review.findByIdAndUpdate(reviewId, updatedReview)
    .then((review) => {
      // console.log(review)
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => console.log(err));
});

// Delete a single review
app.delete("/reviews/:id", (req, res) => {
  Review.findByIdAndRemove(req.params.id)
    .then((review) => {
      res.redirect("/");
    })
    .catch((err) => console.log("err", err));
});

// Listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
