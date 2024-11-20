const express = require("express");
const router = express.Router();
const {
  AddToCart,
  UserCard,
  RemoveCart,
  decreaseQty,
  clearCart,
  IncreaseQty,
} = require("../controller/Cart");
const Authentication = require("../middlewares/auth");
router.post("/add", Authentication, AddToCart);
router.get("/user", Authentication, UserCard);
router.get("/remove/:id", Authentication, RemoveCart);
router.get("/--qty/:id", Authentication, decreaseQty);
router.get("/clear", Authentication, clearCart);
router.get("/qty/increase/:id", Authentication, IncreaseQty);

module.exports = router;
