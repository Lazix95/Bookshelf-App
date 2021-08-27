import { MutationTree } from 'vuex';
import { AuthState, Token, User } from './models';

export const authMutations = <MutationTree<AuthState>>{
  token: (state, payload: Token) => state.token = payload,
  login(state, payload: { token: Token, userData: User }) {
    state.token = payload.token;
    state.userData = payload.userData;
  }
}
