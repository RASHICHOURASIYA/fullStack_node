// auth.js

const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!password || !userName) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const exists = await userModel.findOne({ userName });
    if (exists) {
      return res.status(400).json({ message: "Username already registered, please login" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user instance with hashed password
    const newUser = new userModel({ userName, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

userRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Username not registered, please register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials, please check your details" });
    }

    // Create and return JWT token
    const token = jwt.sign(
      { userId: user._id, userName: user.userName, role: user.role },
      "masai",
      { expiresIn: '1h' }
    );

    res.json({ accessToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = userRouter;
