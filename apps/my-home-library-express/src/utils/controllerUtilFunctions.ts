import path from 'path';
import { unlink } from 'fs';
import { promisify } from 'util'
import { User, UserType } from '../models/user';

const unlinkAsync = promisify(unlink);

export const clearImage = filePath => {
  if(!filePath) return
  filePath = path.join(__dirname, '..', filePath);
  unlinkAsync(filePath);
};
