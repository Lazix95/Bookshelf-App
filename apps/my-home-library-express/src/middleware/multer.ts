import multer from 'multer';
import { v4 } from 'uuid'
import mime from 'mime-types'

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, v4() + '.' + mime.extension(file.mimetype));
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({storage: fileStorage, fileFilter: fileFilter}).single('imageBlob');

