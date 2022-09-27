import { Module } from 'vuex';
import { BooksState } from './models';
import { authActions } from './actions';
import { authMutations } from './mutations';
import { authGetters } from './getters';

export function setBookState(): BooksState {
  return {
    books: [],
    book: null,
  };
}

const bookState: BooksState = setBookState();

const books: Module<BooksState, unknown> = {
  namespaced: true,
  state: bookState,
  actions: authActions,
  mutations: authMutations,
  getters: authGetters,
};

export default books;
