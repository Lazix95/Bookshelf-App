import express from 'express';
const router = express.Router();
import isAuth from '../middleware/isAuth';

// Validations
import { runValidator } from '../validators';
import { required } from '../validators/fieldValidators';
import {
  deleteBook,
  getBooks,
  getBookToReq,
  getOneBook,
  postBook,
  putBook,
} from '../controllers/booksController';
import multer from '../middleware/multer';
import uploadFile from '../middleware/firebaseStorage';
import { validateObjectIdQueryFnc } from '../validators/queryValidators';

const isObjectId = validateObjectIdQueryFnc('bookID', 'Book Not Found!!!!');

router.get('/books', isAuth, getBooks);
router.get(
  '/books/:bookID',
  isAuth,
  isObjectId,
  runValidator,
  getBookToReq,
  getOneBook
);

router.post(
  '/books',
  isAuth,
  multer,
  required('name'),
  required('author'),
  required('publisher'),
  runValidator,
  uploadFile,
  postBook
);
router.put(
  '/books/:bookID',
  isAuth,
  multer,
  isObjectId,
  required('name'),
  required('author'),
  required('publisher'),
  runValidator,
  uploadFile,
  getBookToReq,
  putBook
);
router.delete('/books/:bookID', isAuth, isObjectId, getBookToReq, deleteBook);

export default router;
