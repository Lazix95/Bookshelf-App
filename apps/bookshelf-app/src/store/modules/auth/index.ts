import { Module } from 'vuex';
import { AuthState } from './models';
import { authActions } from './actions';
import { authMutations } from './mutations';
import { authGetters } from './getters';

export function setAuthState(): AuthState {
  return {
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
    },
  };
}

const authState: AuthState = setAuthState();

const auth: Module<AuthState, unknown> = {
  namespaced: true,
  state: authState,
  actions: authActions,
  mutations: authMutations,
  getters: authGetters,
};

export default auth;
