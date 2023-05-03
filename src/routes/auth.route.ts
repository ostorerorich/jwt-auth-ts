import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { validateBody } from '../middlewares/validateBody.middleware'
import { authLogin, authRegister } from '../schema/auth.schema'

const AuthRouter = Router()
const authController = new AuthController()

AuthRouter.post(
  '/register',
  validateBody(authRegister),
  authController.register
)

AuthRouter.post('/login', validateBody(authLogin), authController.login)

export default AuthRouter
