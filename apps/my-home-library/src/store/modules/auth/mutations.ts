import { MutationTree } from 'vuex';
import { AuthState, Token, User } from './models';
import { setAuthState } from './index';

export const authMutations = <MutationTree<AuthState>>{
  token: (state, payload: Token) => state.token = payload,
  login(state, payload: { token: Token, userData: User }) {
    state.token = payload.token;
    state.userData = payload.userData;
  },
  logout: (state) => {
    const newState = setAuthState();
    state.token = newState.token;
    state.userData = newState.userData;
  },
  saveToStorage: (state, payload: {rememberMe: boolean, token: Token}) => {
    if (payload.rememberMe) {
      localStorage.setItem('token', JSON.stringify(payload.token));
      return;
    }
    sessionStorage.setItem('token', JSON.stringify(payload.token));
  },
  clearStorage() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }
}
