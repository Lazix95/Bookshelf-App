import { validationResult } from 'express-validator';

export const runValidator = (req, res, next) => {
  const errors = validationResult(req).formatWith(({msg}) => `${msg[0].toUpperCase()}${msg.slice(1)}`);
  if (!errors.isEmpty()) {
    const errArray = errors.mapped()
    const error = new ValidationError();
    error.validationMessages = errArray;
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
  validationMessages: Record<string, any>
}
