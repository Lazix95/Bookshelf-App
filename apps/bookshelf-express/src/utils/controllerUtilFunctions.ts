import path from 'path';
import { unlink } from 'fs';
import { promisify } from 'util';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const unlinkAsync = promisify(unlink);

export const clearImage = (filePath) => {
  if (!filePath) return;
  filePath = path.join(__dirname, '..', filePath);
  unlinkAsync(filePath);
};

export const isObjectID = (id) => {
  if (ObjectId.isValid(id)) {
    return String(new ObjectId(id)) === id;
  }
  return false;
};

export const hasKey = (obj: Record<string, unknown>, key: string) => {
  return key in obj;
};
