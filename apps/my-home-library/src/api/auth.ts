import { sendRequest } from './index';
import { Token, User } from '../store/modules/auth/models';

export interface RegisterApiPayload {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
}

export interface LoginApiPayload {
  email: string,
  password: string,
}

interface LoginResponse {
  token: Token,
  userData: User
}

export class authApi {
  static register(payload: RegisterApiPayload) {
    return sendRequest<LoginResponse>({method: 'post', url: '/register', data: payload});
  }

  static login(payload: LoginApiPayload) {
    return sendRequest<LoginResponse>({method: 'post', url: '/login', data: payload})
  }
}
