import { check } from 'express-validator';

export function required(field: string, errorMessage: string = undefined) {
  return [
    check(field, { StopValidationOnFirstError: true })
      .trim().not().isEmpty()
      .withMessage(errorMessage ? errorMessage : `${field} is required`)
  ]
}
