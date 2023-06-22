const jwt = require("jsonwebtoken");

// middleware
const checkAuth = (req, res, next) => {
  if (
    typeof req.cookies.myToken === undefined ||
    req.cookies.myToken === null
  ) {
    // failure
    req.user = null;
  } else {
    var decoded = jwt.decode(req.cookies.myToken, { complete: true }) || {};
    req.user = decoded.payload;
  }

  next();
};

module.exports = checkAuth;
