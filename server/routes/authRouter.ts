import { Router } from 'express'
import { loginUser } from '../controllers/loginController'
import { registerUser, validateUser } from '../controllers/registerUserController'
import { currencies } from '../controllers/currenciesControler'

const router = Router()

router.post('/register', validateUser, registerUser  )
router.post('/login', loginUser)
router.get('/currencies', currencies)

export default router
