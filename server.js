const express = require("express");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
require("dotenv").config();
const methodOverride = require("method-override");
const checkAuth = require("./middleware/checkAuth");
const connectToDB = require("./config/db");
// const reviewsRoutes = require("./routes"); // Approach 1

// Init app
const app = express();

// Database connection
connectToDB();

// middlware
app.use(express.json()); // Parses incoming req.body json
app.use(express.urlencoded({ extended: true })); // Parses incoming req.body encoded data
app.use(methodOverride("_method")); // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(express.static("public"));
app.use(cookieParser());
app.use(checkAuth);
// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Routes
// app.use("/", reviewsRoutes); Approach 1
require("./controller/reviews")(app); // function
require("./controller/comments")(app); // function
require("./controller/auth")(app);

// Listen
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
// MVC
// Model - done
// Views - done
// Controller - done
