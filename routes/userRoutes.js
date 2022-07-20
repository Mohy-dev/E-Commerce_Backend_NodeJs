const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController.js");
const { admin, protect } = require("../middleware/authMiddleware.js");
const requestsLimiter = require("../utils/requestsLimiter.js");

router
  .route("/")
  .post(requestsLimiter, registerUser)
  .get(protect, admin, getUsers);

router.post("/login", requestsLimiter, authUser);

router.route("/forgotpassword").post(protect, forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

module.exports = router;
