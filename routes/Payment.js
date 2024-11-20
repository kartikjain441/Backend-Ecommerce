const express = require("express");
const Authentication = require("../middlewares/auth");
const router = express.Router();
const {
  checkout,
  verify,
  userOrder,
  allOrders,
} = require("../controller/Payment");
router.post("/checkout", checkout);
router.post("/verify-payment", verify);
router.get("/userorder", Authentication, userOrder);
router.get("/allorders", allOrders);
module.exports = router;
