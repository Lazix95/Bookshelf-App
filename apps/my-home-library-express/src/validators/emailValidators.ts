import { check } from 'express-validator'
import { User } from '../models/user';

export const validateEmail = [
  check('email', { StopValidationOnFirstError: true })
    .not().isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid (ex. example@example.com)')
]

export const validatePassword = [
  check('password')
    .not().isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

export const checkUniqueUser = [
  check('email').custom(async (value: string) => {
    const user = await User.findOne({ email: value });
    if (user) {
      return Promise.reject('E-mail is already in use');
    }
    return Promise.resolve();
  })
]
