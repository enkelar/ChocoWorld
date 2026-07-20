import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';

export function signToken(user) {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
}

const COOKIE_OPTIONS = {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'lax',
 };
 const COOKIE_MAX_AGE_MS = 4 * 60 * 60 * 1000; // keep in sync with signToken's expiresIn

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.cookie('token', signToken(user), { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE_MS });

  res.json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
  });
});

// POST /api/auth/logout
 export const logout = asyncHandler(async (req, res) => {
   res.clearCookie('token', COOKIE_OPTIONS);
   res.json({ message: 'Logged out' });
 });

// GET /api/auth/me  (protected)
export const me = asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    },
  });
});

export default { login, logout, me };