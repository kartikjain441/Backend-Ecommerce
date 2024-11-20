const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    // Removes whitespace from the beginning and end of the string
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  imgsrc: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
});
const Product = mongoose.model("product", productSchema);

module.exports = Product;
