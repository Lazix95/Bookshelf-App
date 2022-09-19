export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Token {
  token: string;
  refreshToken: string;
  iat: number;
  validUntil: number;
}

export interface AuthState {
  userData?: User;
  token: Token;
}
