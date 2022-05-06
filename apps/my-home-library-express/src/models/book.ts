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
    trim: true,
    required: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  publisher: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
  },
  storageRef: {
    type: String,
    required: function () {
      return !!this.imageUrl;
    },
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
