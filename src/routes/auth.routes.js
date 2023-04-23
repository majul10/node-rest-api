import {Router} from 'express'
import {login, authenticateToken, datosProtegidos} from '../middleware/auth.js';

const router = Router()

router.post('/login', login);

router.get('/datos-protegidos', authenticateToken, datosProtegidos);


export default router