import { Router } from 'express'
import { loginUser } from '../controllers/loginController'
import { registerUser } from '../controllers/registerUserController'
import { validateUser } from '../middlewares/userValidation'
import { validateLogin } from '../middlewares/validateLogin'
import { currencies } from '../controllers/currenciesControler'
import { creditCardTransactions } from '../controllers/creditCardTransactions'

const router = Router()

router.post('/register', validateUser, registerUser  )
router.post('/login', validateLogin, loginUser)
router.get('/currencies', currencies)
router.post('/creditcard', creditCardTransactions)

export default router
