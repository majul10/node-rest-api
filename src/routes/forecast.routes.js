import {Router} from 'express'
import {getForecast,getForecast_id,createForecast,updateForecast,deleteForecast} from '../controllers/forecast.controller.js'
import {authenticateToken} from '../middleware/auth.js';

const router = Router()


router.get('/forecast', authenticateToken,getForecast)

router.get('/forecast/:id_alerta',authenticateToken, getForecast_id)

router.post('/forecast', authenticateToken, createForecast )

router.patch('/forecast/:id_alerta', authenticateToken,updateForecast)

router.delete('/forecast/:id_alerta', authenticateToken, deleteForecast)



export default router