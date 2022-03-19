import { check } from 'express-validator';

export function required(field) {
  return [
    check(field, { StopValidationOnFirstError: true })
      .trim().not().isEmpty()
      .withMessage(`${field} is required`)
  ]
}
