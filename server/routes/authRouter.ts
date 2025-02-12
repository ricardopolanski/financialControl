import { Router } from 'express'
import { loginUser } from '../controllers/loginController'
import { registerUser } from '../controllers/registerUserController'

const router = Router()

router.post('/register', registerUser )
router.post('/login', loginUser)

export default router
