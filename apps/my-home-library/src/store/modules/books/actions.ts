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
  },

  updateBook({commit}, payload: BookApiPayload) {
    return booksApi.updateBook(payload).then(res => {
      commit('updateBook', res.data.book);
      return res.data.book;
    })
  },

  deleteBook({commit}, payload: { bookID: number }) {
    return booksApi.deleteBook(payload.bookID).then(() => {
      commit('deleteBook', payload.bookID);
    })
  },
}
