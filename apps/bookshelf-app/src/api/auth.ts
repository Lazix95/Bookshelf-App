import { sendRequest } from './index';
import { Token, User } from '../store/modules/auth/models';
import { AxiosResponse } from 'axios';

export interface RegisterApiPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginApiPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  token: Token;
  userData: User;
}

interface MeResponse {
  userData: User;
}

export class authApi {
  static register(payload: RegisterApiPayload): Promise<AxiosResponse<LoginResponse>> {
    return sendRequest<LoginResponse>({ method: 'post', url: '/register', data: payload, });
  }

  static login(payload: LoginApiPayload): Promise<AxiosResponse<LoginResponse>> {
    return sendRequest<LoginResponse>({ method: 'post', url: '/login', data: payload, });
  }

  static me(token: string): Promise<AxiosResponse<MeResponse>> {
    const headers = { Authorization: `Bearer ${token}`, };
    return sendRequest<MeResponse>({ method: 'get', url: '/me', headers });
  }
}
