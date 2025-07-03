const mongoose = require("mongoose");
const { validate } = require("./userModel");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
      set: (p) => Math.round(p * 100) / 100, // Round to two decimal places
    },
    stock: {
      type: Number,
      required: true,
      validate: {
        validator: function (integer) {
          return integer >= 0; // Ensure stock is a non-negative integer
        },
        message: "Stock must be a non-negative integer",
      },
    },

    minimumStock: {
      type: Number,
      required: true,
      validate: {
        validator: function (integer) {
          return integer >= 0 && integer <= this.stock; // Ensure minimum stock is between 0 and current stock
        },
        message: "Minimum stock must be between 0 and current stock",
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 1, category: 1 }, { unique: true }); // Ensure unique product names within the same category

module.exports = mongoose.model("Product", productSchema);
