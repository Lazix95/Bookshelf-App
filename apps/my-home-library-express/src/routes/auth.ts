import express from 'express';
const router = express.Router();
import { login, register } from '../controllers/auth';

// Validations
import { runValidator } from '../validators';
import { checkUniqueUser, validateEmail, validatePassword } from '../validators/emailValidators';

router.post('/login', validateEmail, validatePassword, runValidator, login);
router.post('/register', validateEmail, validatePassword, checkUniqueUser, runValidator, register, login);

export default router;
