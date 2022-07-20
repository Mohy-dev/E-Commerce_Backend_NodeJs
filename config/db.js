const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
  try {
    // Connect to MongoDB atlas cloud
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (conn) {
      console.log(
        `MongoDB Connected Atlas: ${conn.connection.host}`.blue.underline.bold
      );
    } else {
      // Otherwise, connect locally
      const conn2 = await mongoose.connect(
        "mongodb://localhost:27017/E_COMMERCE_DATA",
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
        }
      );
      console.log(
        `MongoDB Connected Locally: ${conn2.connection.host}`.pink.underline
          .bold
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
