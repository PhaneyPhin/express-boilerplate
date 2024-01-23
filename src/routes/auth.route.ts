import express from 'express'
import { authController } from '../controllers/auth.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.get('/', AuthMiddleware, authController.getProfile)
authRouter.post('/register', authController.register)

export default authRouter