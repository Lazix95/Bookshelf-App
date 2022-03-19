import { GetterTree } from 'vuex';
import { BooksState } from './models';

export const authGetters = <GetterTree<BooksState, unknown>>{
  books: (state) => state.books,
}
