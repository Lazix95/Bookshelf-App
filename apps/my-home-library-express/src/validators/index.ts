import { validationResult } from 'express-validator';

export const runValidator = (req, res, next) => {
  const errors = validationResult(req).formatWith(({msg}) => `${msg[0].toUpperCase()}${msg.slice(1)}`);
  if (!errors.isEmpty()) {
    const errArray = errors.array({ onlyFirstError: true });
    const error = new ValidationError(errArray[0]);
    error.status = 422;
    throw error;
  }
  next();
}

class ValidationError extends Error{
  constructor(...args) {
    super(...args);
  }

  status: number
}
