import { ActionTree } from 'vuex';
import { AuthState } from './models';

import { authApi, LoginApiPayload, RegisterApiPayload } from '../../../api/auth';

export const authActions = <ActionTree<AuthState, unknown>>{
  async login({commit}, payload: LoginApiPayload ) {
    const response = await authApi.login(payload)
    commit('login', response.data);
    console.log(response);
  },

  async register({ commit }, payload: RegisterApiPayload) {
    const response = await authApi.register(payload);
    commit('login', response.data);
    console.log(response);
  }
}
