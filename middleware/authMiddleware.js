const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

// Middleware to check if the user is logged in or not
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Check if the token is in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];
      // Verify the token by decoding it(base64), decoded has the user (id, email) and the expiry date of the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  // If the token is not in the header
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

// Middleware to check if the user is an admin or not
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = {
  protect,
  admin,
};
