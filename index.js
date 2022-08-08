const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const requestsLimiter = require("./utils/requestsLimiter");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const mountRoutes = require("./routes/indexRoutes.js");
const connectDB = require("./config/db.js");

//Load environment variables from .env file
require("dotenv").config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Use cors to allow cross origin requests between frontend and backend
app.use(cors());
app.options("*", cors());

// Use compression to compress the response body => faster response time
app.use(compression());

// Logger middleware for development environment only
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser middleware to parse the request body into json format
var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: "*/*" }));
app.use(express.json(), express.urlencoded({ extended: false }), express.raw());

// Secure from hpp request attacks
app.use(
  hpp({
    whitelist: ["price", "countInStock", "countInStock", "rating"],
  })
);

// Use rate limiter to limit the number of requests per IP address
app.use("/api", requestsLimiter);

// Mount all routes
mountRoutes(app);

var __dirname = path.resolve();

// Serve static assets in production environment only
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server is only running, please make environment to production");
  });
}

// app.use(notFound);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Start server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
