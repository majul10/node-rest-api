import {Router} from 'express'
import {getForecast,getForecast_id,createForecast,updateForecast,deleteForecast} from '../controllers/forecast.controller.js'

const router = Router()


router.get('/forecast', getForecast)

router.get('/forecast/:id_alerta', getForecast_id)

router.post('/forecast', createForecast )

router.patch('/forecast/:id_alerta', updateForecast)

router.delete('/forecast/:id_alerta', deleteForecast)



export default router