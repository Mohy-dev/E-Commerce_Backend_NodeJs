const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      // comment match when you use seeder to import data
      // match: [
      //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //   "Please enter a valid email",
      // ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      // minlength: [9, "password must be at least 9 characters"],
      // match: [/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/, "password must be at least 9 characters and contain at least one number, one uppercase and one lowercase letter"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the hashed password (Timing attack safe)
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if there password, if there it should be register and there is new password to hash in the document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Generating salt for passwords
  const salt = await bcrypt.genSalt(10);
  // Hashing the password
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getResetPasswordToken = function () {
  // Generate a token for reset password
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token and set it to the user
  this.resetPasswordToken = crypto
    .createHash("sha256") // Hash the token with sha256
    .update(resetToken) // Update the token
    .digest("hex"); // Get the digest

  // Set the expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
