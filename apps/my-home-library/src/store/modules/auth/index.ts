import { Module } from 'vuex';
import { AuthState, Token, User } from './models';
import { authActions } from './actions';
import { authMutations } from './mutations';
import { authGetters } from './getters';

const authState: AuthState = {
  token: {
    token: '',
    refreshToken: '',
    iat: 0,
    validUntil: 0,
  },

  userData: {
    email: '',
    firstName: '',
    lastName: '',
  }
};

const auth:Module<AuthState, unknown> = {
  namespaced: true,
  state: authState,
  actions: authActions,
  mutations: authMutations,
  getters: authGetters
}

export default auth;
