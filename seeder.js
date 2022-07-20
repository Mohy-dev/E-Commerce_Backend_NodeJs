const mongoose = require("mongoose");
const users = require("./data/users.js");
const product = require("./data/products.js");
const User = require("./models/userModel.js");
const Product = require("./models/productModel.js");
const Order = require("./models/orderModel.js");
const connectDB = require("./config/db.js");

require("dotenv").config();
connectDB();

const importData = async () => {
  try {
    // Fresh delete collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // add all users
    const createUsers = await User.insertMany(users);
    // select admin user (admin@gmail.com)
    const adminUser = createUsers[0]._id;
    //add admin user for each product
    const sampleProducts = product.map((product) => {
      return { ...product, user: adminUser };
    });
    //add all products
    await Product.insertMany(sampleProducts);
    console.log("Data Imported".green.inverse.bold);
  } catch (error) {
    console.log(`${error}`.red.underline);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all data in the collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data Destroyed !`.red.inverse);
  } catch (error) {
    console.log(`${error}`.red.underline);
    process.exit(1);
  }
};

//"node backend/seeder" to import data
//"node backend/seeder -d" to destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
