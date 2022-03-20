import express from 'express';
const router = express.Router();
import isAuth from '../middleware/isAuth';

// Validations
import { runValidator } from '../validators';
import { required } from '../validators/fieldValidators';
import { deleteBook, getBooks, getBookToReq, getOneBook, postBook, putBook } from '../controllers/books';
import multer from '../middleware/multer';
import uploadFile from '../middleware/firebaseStorage';

router.get('/books', isAuth, getBooks);
router.get('/books/:bookID', isAuth, getBookToReq, getOneBook);
router.post('/books', isAuth, multer, required('name'), required('author'), required('publisher'), runValidator, uploadFile, postBook);
router.put('/books/:bookID', isAuth, multer, required('name'), required('author'), required('publisher'), runValidator, uploadFile, putBook);
router.delete('/books/:bookID', isAuth, getBookToReq, deleteBook);

export default router;
