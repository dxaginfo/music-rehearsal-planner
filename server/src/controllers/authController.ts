import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { asyncHandler } from '../middleware/asyncHandler';

// Generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecret123', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, instrument, phone } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    email,
    password,
    name,
    instrument,
    phone,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      instrument: user.instrument,
      phone: user.phone,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      instrument: user.instrument,
      phone: user.phone,
      profilePicture: user.profilePicture,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // req.user is set in authMiddleware
  const user = await User.findById(req.user?._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user?._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.instrument = req.body.instrument || user.instrument;
    user.phone = req.body.phone || user.phone;
    user.defaultAvailability = req.body.defaultAvailability || user.defaultAvailability;
    user.notifications = req.body.notifications || user.notifications;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.profilePicture) {
      user.profilePicture = req.body.profilePicture;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      instrument: updatedUser.instrument,
      phone: updatedUser.phone,
      profilePicture: updatedUser.profilePicture,
      defaultAvailability: updatedUser.defaultAvailability,
      notifications: updatedUser.notifications,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});