import { Book } from '../models/bookModel';
import Err from '../types/Err';
import { hasKey } from '../utils/controllerUtilFunctions';
import { deleteStorageFile } from '../middleware/firebaseStorage';

export const getBooks = async (req, res, next) => {
  try {
    //const page = req.query.page;
    //const limit = req.query.limit;
    //const skip = page * limit;
    const books = await Book.find({ user: req.user._id }, null);

    //TODO: Remove Timeout after loading test
    setTimeout(() => {
      res.status(200).json({ books });
    }, 1000);
  } catch (err) {
    if (err.status) err.status = 500;
    next(err);
  }
};

export const getBookToReq = async (req, res, next) => {
  try {
    const bookID = req.params.bookID;

    const book = await Book.findOne({ _id: bookID, user: req.user._id });

    if (!book) {
      const error = new Err('Book Not Found!');
      error.status = 404;
      next(error);
      return;
    }

    req.book = book;

    //TODO: Remove Timeout after loading test
    setTimeout(() => {
      next();
    }, 1000);
  } catch (err) {
    if (err.status) err.status = 500;
    next(err);
  }
};

export const getOneBook = async (req, res, next) => {
  try {
    const book = req.book;

    res.status(200).json({ book });
  } catch (err) {
    if (err.status) err.status = 500;
    next(err);
  }
};

export const postBook = async (req, res, next) => {
  try {
    const { name, author, publisher } = req.body;
    const imageUrl = req?.file?.mediaLink;
    const storageRef = req?.file?.storageRef;
    const user = req.user._id;

    const book = new Book({
      name,
      author,
      publisher,
      imageUrl,
      storageRef,
      user,
    });
    await book.save();

    res.status(201).json({ book });
  } catch (err) {
    if (err.status) err.status = 500;
    next(err);
  }
};

export const putBook = async (req, res, next) => {
  try {
    const body = req.body;
    const deleteCover = req.body.deleteCover;
    const bookID = req.params.bookID;
    const imageUrl = req?.file?.mediaLink;
    const storageRef = req?.file?.storageRef;

    const currentBook = req.book;

    const updatePayload = {
      ...(hasKey(body, 'name') && { name: body.name }),
      ...(hasKey(body, 'author') && { author: body.author }),
      ...(hasKey(body, 'publisher') && { publisher: body.publisher }),
      ...(deleteCover && { imageUrl: '', storageRef: '' }),
      ...(imageUrl && { imageUrl }),
      ...(storageRef && { storageRef }),
    };

    if (
      (deleteCover && currentBook && currentBook.imageUrl) ||
      (storageRef && currentBook && currentBook.storageRef)
    ) {
      await deleteStorageFile(currentBook.storageRef);
    }

    const book = await Book.findOneAndUpdate(
      { _id: bookID, user: req.user._id },
      updatePayload,
      { new: true }
    );

    res.status(200).json({ book });
  } catch (err) {
    if (err.status) err.status = 500;
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = req.book;
    if (book.storageRef) await deleteStorageFile(book.storageRef);
    await book.delete();

    res.status(200).json({ status: 'OK' });
  } catch (err) {
    if (err.status) err.status = 500;
    next(err);
  }
};
