import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

export const loginValidator = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];