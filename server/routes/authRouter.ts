import { Router } from 'express'
import { loginUser } from '../controllers/loginController'
import { registerController } from '../controllers/registerUserController'
import { validateUser } from '../middlewares/userValidation'
import { validateLogin } from '../middlewares/validateLogin'
import { currencies } from '../controllers/currenciesControler'
import { creditCardTransactions } from '../controllers/creditCardTransactions'
import { setUserStatus } from '../controllers/setUserStatus'
import { authenticateUser } from '../controllers/authController'
import { validateUserRole } from '../middlewares/validadeUserRole'
import { createUser } from '../controllers/createUser'

const router = Router()

router.post('/register', validateUser, registerController  )
router.post('/login', validateLogin, loginUser)
router.get('/currencies', authenticateUser, validateUserRole, currencies)
router.post('/creditcard', authenticateUser, validateUserRole, creditCardTransactions)
router.post('/userstatus', authenticateUser, validateUserRole, setUserStatus)
router.post('/createuser', validateUser, authenticateUser, validateUserRole, createUser)

export default router
