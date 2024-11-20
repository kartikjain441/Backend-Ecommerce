const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Assuming you have a Product model
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  qty: {
    type: Number,
    required: true, // Corrected from "require" to "required"
  },
  imgsrc: {
    type: String,
    required: true, // Corrected from "require" to "required"
  },
});

const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
