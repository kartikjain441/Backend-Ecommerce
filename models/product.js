const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    
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
    default: Date.now, 
  },
});
const Product = mongoose.model("product", productSchema);

module.exports = Product;
