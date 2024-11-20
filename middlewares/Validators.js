const { body } = require("express-validator");
const registerValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];


const resetPasswordValidationRules = [
  body("newPassword")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
];

module.exports = { registerValidationRules ,resetPasswordValidationRules};
