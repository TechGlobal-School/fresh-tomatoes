const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TOKEN_NAME = "myToken";

module.exports = function (app) {
  // Get sign-up form
  app.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });

  // Sign-up user
  app.post("/sign-up", (req, res) => {
    const newUser = new User(req.body);
    newUser
      .save()
      .then((user) => {
        // Create a token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        // Send this token to client
        res.cookie(TOKEN_NAME, token, { maxAge: 360000, httpOnly: true });
        // Redirect to home
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

  // Logout user
  app.get("/logout", (req, res) => {
    // Clear cookie
    res.clearCookie(TOKEN_NAME);
    res.redirect("/login");
  });

  // Get Login form
  app.get("/login", (req, res) => {
    res.render("login");
  });

  // Login user
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // find user from Database by using username
    User.findOne({ username: username }).then((user) => {
      //   console.log("user", user);
      // Check if user exists
      if (!user) {
        res.status(401).render("login", {
          message: "Wrong username. Try again!",
        });
      }
      // compare password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch === false) {
          res.status(401).render("login", {
            message: "Wrong password. Try again!",
          });
        }
      });

      // Create a token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      // Send this token to client
      res.cookie(TOKEN_NAME, token, { maxAge: 360000, httpOnly: true });
      // Redirect to home
      res.redirect("/");
    });
  });
};
