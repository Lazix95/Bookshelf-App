import Err from '../types/Err';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Err('Not Authenticated');
    error.status = 401;
    throw error
  }
  const token = req.get('Authorization').split(' ')[1];

  let decodedToken;
  try{
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    err.status = 401;
    throw err
  }
  if (!decodedToken || (decodedToken && decodedToken.invitation)) {
    const error = new Err('Not authenticated.');
    error.status = 401;
    throw error
  }
  req.user = decodedToken.user;
  next();
};
