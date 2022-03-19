import { ActionTree } from 'vuex';
import { AuthState, Token } from './models';

import { authApi, LoginApiPayload, RegisterApiPayload } from '../../../api/auth';

export const authActions = <ActionTree<AuthState, unknown>>{
  login({commit}, payload: LoginApiPayload ) {
    const { email, password, rememberMe } = payload;
    return authApi.login({email, password}).then((response) => {
      commit('login', response.data);
      commit('saveToStorage', {rememberMe, token: response.data.token});
      return response;
    });
  },

  tryAutoLogin({commit}) {
    const tokenStr = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (tokenStr) {
      const token: Token = JSON.parse(tokenStr);
      return authApi.me(token.token).then((res) => {
        commit('login', { token, userData: res.data.userData });
        return res;
      } )
    }
    return Promise.reject('Token is not valid');
  },

  logout({commit}) {
    commit('logout');
    commit('clearStorage');
  },

  register({ commit }, payload: RegisterApiPayload) {
    return authApi.register(payload).then((response) => {
      commit('login', response.data);
      return response;
    });
  }
}
