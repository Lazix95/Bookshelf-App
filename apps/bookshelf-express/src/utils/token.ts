import jwt, { JwtPayload } from 'jsonwebtoken';
import Err from '../types/Err';

interface CreateTokenArgs {
  exp?: number;
  payload: { [key: string]: unknown };
}

interface RefreshTokenArgs {
  token: string;
}

export const createToken = ({ exp = 3600, payload }: CreateTokenArgs) => {
  const iat = Date.now();
  const validUntil = Date.now() + exp * 1000;
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: exp || 3600,
  });
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return { token, refresh_token, exp: exp || 3600, validUntil, iat };
};

export const refreshToken = ({ token }: RefreshTokenArgs) => {
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    const error = new Err('Authentication Failed');
    error.status = 401;
    throw error;
  }
  delete payload.iat;
  delete payload.exp;
  return createToken({ payload });
};

export const decodeToken = (token: string, secret = process.env.TOKEN_SECRET): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
}
