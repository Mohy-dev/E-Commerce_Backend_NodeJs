const rateLimit = require("express-rate-limit");

// Modify x-rate-limit in the headers (brute force/ DDOS protection)
var countMax = 6;
const requestsLimiter = rateLimit({
  max: countMax,
  windowsMS: 1000 * 60 * 0.5,
  message: "You reached the limit, try again later",
});

module.exports = requestsLimiter;
