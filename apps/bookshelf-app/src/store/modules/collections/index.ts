import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { collectionsState } from './models';

export const state: collectionsState = {};

 const collections: Module<collectionsState, unknown> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

 export default collections;
