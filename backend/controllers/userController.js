import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Wrong payload, must have email and password");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Wrong Credentials");
  }

  generateToken(res, user._id);
  res.status(201).json({ user });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Wrong payload, must have name, email and password");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ user });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// const updateUserProfile = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   const user = await User.findById(req.user._id);
//   try {
//     user.name = name;
//     await user.save();
//     res.status(200).json({ message: "user updated!" });
//   } catch (err) {
//     res.status(400);
//     throw new Error("could not update user name");
//   }
// });

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "user profile",
    user: req.user,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
});

export { login, registerUser, getUser, logout };
