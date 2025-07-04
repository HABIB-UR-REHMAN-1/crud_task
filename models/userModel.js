const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
