const express = require("express");
const router = express.Router();
const {
  addProduct,
  allProduct,
  getProductById,
  UpdateById,
  deleteById,
} = require("../controller/product");
router.post("/add", addProduct);
router.get("/all", allProduct);
router.get("/get/:id", getProductById);
router.put("/update/:id", UpdateById);
router.delete("/delete/:id", deleteById);
module.exports = router;
