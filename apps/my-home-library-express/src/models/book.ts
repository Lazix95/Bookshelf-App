import { Schema, model } from 'mongoose';
import { AuthorType } from './author';

export interface BookType {
  name: string,
  imageUrl: string,
  author: AuthorType[] | number[],
  publisher: string,
  storageRef: string
}

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  storageRef: {
    type: String,
    required: function () {
      return !!this.imageUrl;
    },
  },
  imageUrl: {
    type: String,
  },
})

bookSchema.method('toJSON', function() {
  const book = this.toObject();
  book.id = book._id;
  delete book._id;
  delete book.__v;
  return book;
});

export const Book = model<BookType>('Book', bookSchema);
