import { param } from 'express-validator';
import { isObjectID } from '../utils/controllerUtilFunctions';

export const validateObjectIdQueryFnc = (field: string, message: string) => {
  return [
    param(field).custom(async (value: string) => {
      if (isObjectID(value)) return Promise.resolve();
      return Promise.reject(message);
    }),
  ];
};
