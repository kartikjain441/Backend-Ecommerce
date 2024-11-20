const express = require("express");
const router = express.Router();
const {
  register,
  login,
  allUsers,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require("../controller/user");
const {
  registerValidationRules,
  resetPasswordValidationRules,
} = require("../middlewares/Validators");
router.post("/register", registerValidationRules, register);
router.post("/login", login);
router.get("/all", allUsers);
router.get("/verify-email/:token", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post(
  "/reset-password/:token",
  resetPasswordValidationRules,
  resetPassword
);
module.exports = router;
