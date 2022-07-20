const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  GetMyOrders,
  getOrderById,
  GetOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

router.route("/").post(protect, addOrderItems).get(protect, admin, GetOrders);

router.route("/myorders").get(protect, GetMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
