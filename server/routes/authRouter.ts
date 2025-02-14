import { Router } from 'express'
import { loginUser } from '../controllers/loginController'
import { registerUser, validateUser } from '../controllers/registerUserController'

const router = Router()

router.post('/register', validateUser, registerUser  )
router.post('/login', loginUser)

export default router
