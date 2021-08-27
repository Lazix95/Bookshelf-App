import { Schema, model } from 'mongoose';
import { AuthorType } from './author';

export interface BookType {
  name: string,
  imageUrl: string,
  author: AuthorType[] | number[],
}

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
})

export const Book = model<BookType>('Book', bookSchema);
