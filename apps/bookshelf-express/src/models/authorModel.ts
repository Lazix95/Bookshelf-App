import { Schema, model } from 'mongoose';
import { BookType } from './bookModel';

export interface AuthorType {
  name: string;
  publishingHouses: string[];
  books: BookType[] | number[];
}

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  publishingHouses: {
    type: Array,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

export const Author = model<AuthorType>('Author', authorSchema);
