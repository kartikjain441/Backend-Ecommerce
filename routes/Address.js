const express = require("express");
const router = express.Router();
const { AddAddress, LastAddress } = require("../controller/Address");
const Authentication = require("../middlewares/auth");
router.post("/add", Authentication, AddAddress);
router.get("/get", Authentication, LastAddress);
module.exports = router;
