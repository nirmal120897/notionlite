import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from 'express-validator'
import bcrptjs from 'bcrypt'
import jwt from 'jsonwebtoken'

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    throw new Error(result.array()[0].msg);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password: await bcrptjs.hash(password, 10),
    role: "user"
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { email, password } = req.body;

  // 1. Check user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // 2. Verify password with bcrypt
  const isMatch = await bcrptjs.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // 3. Generate token payload
  const payload = {
    id: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "default_jwt_secret",
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "default_refresh_secret",
    { expiresIn: "30d" }
  );

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    refreshToken,
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

