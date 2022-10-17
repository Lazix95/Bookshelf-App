import { Book } from '../books/models';

export interface collectionsState {
collections: unknown
}

export interface Collection {
  readonly name: string;
  readonly books: Book[];
  readonly imageUrl: string;
}
