import { GetterTree } from 'vuex';
import { AuthState } from './models';

export const authGetters = <GetterTree<AuthState, unknown>>{
  isLoggedIn: (state) => state.token.validUntil > Date.now(),
  token: (state) => state.token.token,
}
