const Product = require("../models/product");
const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgsrc } = req.body;
  try {
    const product = await Product.create({
      title,
      description,
      price,
      category,
      qty,
      imgsrc,
    });
    res
      .status(201)
      .json({ message: "product added successfully", product, success: true });
  } catch (error) {
    // If there is an error, log it and send an error response
    console.error("Error adding product:", error.message);
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

const allProduct = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 });
    res.json(allProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: error.message });
  }
};
const UpdateById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ updatedProduct, success: true, message: "Edited Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  addProduct,
  allProduct,
  getProductById,
  UpdateById,
  deleteById,
};
