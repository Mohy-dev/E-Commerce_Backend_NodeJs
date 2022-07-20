// Middleware to handle not found urls
const notFound = (err, req, res, next) => {
  var err = new Error(`not found ${req.originalUrl}`);
  res.status(404);
  next(err);
};

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status_code: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
