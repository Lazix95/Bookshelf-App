import { MutationTree } from 'vuex';
import { Book, BooksState } from './models';

export const authMutations = <MutationTree<BooksState>>{
  getBooks: (state, payload: Book[]) => {
    state.books = payload;
  },

  getOneBook: (state, payload: Book) => {
    state.book = payload;
  },

  storeBook: (state, payload: Book) => {
    state.books = [...state.books, payload];
  },

  updateBook: (state, payload) => {
    state.books = [...state.books].map((book) => {
      if (book.id === payload.id) return payload;
      return book;
    });
  },

  deleteBook: (state, payload: string) => {
    state.books = [...state.books].filter((book) => book.id !== payload);
  },
};
