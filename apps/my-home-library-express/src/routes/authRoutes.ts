import express from 'express';
const router = express.Router();
import { login, register, me } from '../controllers/authController';
import isAuth from '../middleware/isAuth';

// Validations
import { runValidator } from '../validators';
import { checkConfirmPassword, checkUniqueUser, validateEmail, validatePassword } from '../validators/authValidators';
import { required } from '../validators/fieldValidators';

router.post('/login', validateEmail, validatePassword, runValidator, login);
router.post('/register', required('firstName'), required('lastName'), validateEmail, validatePassword, checkConfirmPassword, checkUniqueUser, runValidator, register, login);
router.get('/me', isAuth, me);

export default router;
