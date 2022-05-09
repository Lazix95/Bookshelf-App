import { check } from 'express-validator';
import { isObjectID } from '../utils/controllerUtilFunctions';

export function required(field: string, errorMessage: string = undefined) {
  return [
    check(field, { StopValidationOnFirstError: true })
      .trim().not().isEmpty()
      .withMessage(errorMessage ? errorMessage : `${field} is required`)
  ]
}

export const validateObjectIdFieldFnc = (field: string) => {
  return [
    check(field).custom(async (value: string) => {
      if (isObjectID(value)) return Promise.resolve();
      return Promise.reject(`${field} is not ObjectId`);
    }),
  ]
}

export const validateObjectIdFieldArrayFnc = (field: string) => {
  return [
    check(field).custom(async (values: string[]) => {
      let status = true;

      if(!values) return Promise.resolve();

      if (!Array.isArray(values)) return Promise.reject(`${field} must be an Array!`);

      values.forEach((value) => {
        if(!isObjectID(value)) status = false;
      })

      if (status) return Promise.resolve(`${field} must be an array of ObjectIds`);
      return Promise.reject();
    }),
  ]
}
