import Err from '../types/Err';

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Err('Not Authenticated');
      error.status = 401;
      next(error);
    }
    const token = req.get('Authorization').split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedToken || (decodedToken && decodedToken.invitation)) {
      const error = new Err('Not authenticated.');
      error.status = 401;
      next(error)
    }
    req.user = decodedToken.user;
    next();
  } catch (e) {
    const error = new Err('Not Authenticated');
    error.status = 401;
    next(error)
  }
};
