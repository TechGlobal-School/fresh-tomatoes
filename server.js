const express = require("express");
const { engine } = require("express-handlebars");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

// Database connection
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mtqfogt.mongodb.net/?retryWrites=true&w=majority`;
const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database successfully connected!");
  } catch (err) {
    console.log("DATABASE ERROR", err);
  }
};
connectToDB();

// Create Model
// const { Schema } = mongoose;
// const schema = new Schema({
//   title: String,
//   movieTitle: String,
// });
const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
});

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// fake review data
// let reviews = [
//   { title: "Excellent movie!", movieTitle: "Batman" },
//   { title: "Awesome Movie", movieTitle: "Titanic" },
// ];

// Routes
app.get("/", (req, res) => {
  Review.find()
    .lean()
    .then((reviews) => {
      // console.log("reviews from DB: ", reviews);
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => console.log("err", err));
});

// Listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
