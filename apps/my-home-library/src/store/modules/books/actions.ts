import { ActionTree } from 'vuex';
import { BooksState } from './models';
import { BookApiPayload, booksApi } from '../../../api/books';

export const authActions = <ActionTree<BooksState, unknown>>{
  getBooks({commit}) {
    return booksApi.getBooks().then(res => {
      commit('getBooks', res.data.books);
      return res.data.books;
    })
  },

  getOneBook({commit}, payload: { bookID: number }) {
    return booksApi.getOneBook(payload.bookID).then(res => {
      return res.data.book;
    })
  },

  storeBook({commit}, payload: BookApiPayload) {
    return booksApi.storeBook(payload).then(res => {
      commit('storeBook', res.data.book);
      return res.data.book;
    })
  }
}
