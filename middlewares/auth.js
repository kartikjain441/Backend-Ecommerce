const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) {
    return res.json({ message: "Please log in first." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Authentication failed." });
    }

    req.id = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports = authentication;
