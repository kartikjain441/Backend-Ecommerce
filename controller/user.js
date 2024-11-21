const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const register = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json({ errors: error.array() });
  }

  const { name, email, password } = req.body;

  try {
    const hashpass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashpass,
      isVerified: false,
    });

    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const verificationLink = `http://localhost:3000/api/user/verify-email/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Hello ${name},\n\nPlease verify your email by clicking the link: ${verificationLink}\n\nThis link expires in 1 hour.\n\nBest Regards,\nYour Team`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      user,
      message: "User registration successful",
      success: true,
    });
  } catch (err) {
    console.error("Error registering user:", err);

    if (err.code === 11000) {
      return res.json({
        message: "Email already in use",
        errors: [{ msg: "Email already in use" }],
      });
    }

    res.status(500).json({
      message: "User registration failed",
      error: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    return res.redirect("https://frontend-ecommerce-beta-two.vercel.app/login");
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `https://frontend-ecommerce-beta-two.vercel.app/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Hello, \n\nPlease reset your password by clicking the link: ${resetLink}\n\nThis link expires in 1 hour.\n\nBest Regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json({ errors: error.array() });
  }

  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashpass = await bcrypt.hash(newPassword, 10);
    user.password = hashpass;
    await user.save();

    res.json({ message: "Password reset successful", success: true });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.json({ message: "Please verify your email to log in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res
      .status(200)
      .json({ token, message: "user login successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const allUser = await User.find().sort({ createdAt: -1 });
    res.json(allUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

module.exports = {
  register,
  login,
  allUsers,
  verifyEmail,
  resetPassword,
  forgetPassword,
};
