import { MutationTree } from 'vuex';
import { Book, BooksState } from './models';

export const authMutations = <MutationTree<BooksState>>{
  getBooks: (state, payload: Book[]) => {
    state.books = payload;
  },

  storeBook: (state, payload: Book) => {
    state.books = [...state.books, payload];
  }
}
