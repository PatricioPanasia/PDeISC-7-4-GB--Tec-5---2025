import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Validaciones
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Debe ser un correo electrónico válido'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('La contraseña es requerida')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Debe ser un correo electrónico válido'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('La contraseña es requerida')
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', authenticateToken, getMe);

export default router;