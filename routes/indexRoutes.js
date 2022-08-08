const userRoutes = require("./userRoutes.js");
const orderRoutes = require("./orderRoutes.js");
const productRoutes = require("./productRoutes.js");

const mountRoutes = (app) => {
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
  app.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
  );
};

module.exports = mountRoutes;
