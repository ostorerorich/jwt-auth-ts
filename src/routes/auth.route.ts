import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { validateBody } from '../middlewares/validateBody.middleware'
import { authLogin, authRegister } from '../schema/auth.schema'
import { validateToken } from '../middlewares/auth.middleware'

const AuthRouter = Router()
const authController = new AuthController()

AuthRouter.post(
  '/register',
  validateBody(authRegister),
  authController.register
)

AuthRouter.post('/login', validateBody(authLogin), authController.login)

AuthRouter.get('/users', validateToken, authController.users)

export default AuthRouter
