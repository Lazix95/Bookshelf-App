import bcrypt from 'bcrypt';
import { UserType, User } from '../models/user';
import Err from '../types/Err';
import { createToken } from '../utils/token';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Err('Login failed, wrong user credentials');
      error.status = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Err('Login failed, wrong user credentials');
      error.status = 401;
      throw error;
    }
    const token = createToken({
      payload: { user: { _id: user._id.toString() } },
    });
    res.status(200).json({ token, userData: user });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName }: UserType = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    }).save();
    next();
  } catch (err) {
    if (err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ userData: user });
  } catch (err) {
    if (err.status) {
      err.status = 500;
    }
    next(err);
  }
};
