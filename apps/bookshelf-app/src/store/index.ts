import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './modules/auth';
import books from './modules/books';
import collections from './modules/collections'

export default new Vuex.Store({
  modules: {
    auth,
    books,
    collections
  },
});
