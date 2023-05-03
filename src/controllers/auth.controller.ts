import { NextFunction, Request, Response } from 'express'
import { AuthSchema, AuthModel } from '../models/auth.model'
import { signToken } from '../utils/jwt'
import { ErrorHandler } from '../middlewares/errorHandler.middleware'

export class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, username, email, password, confirmPassword } = req.body
      const existUser = await AuthModel.exists({
        $or: [{ username }, { email }],
      })

      if (existUser)
        return res.status(400).json({ message: 'User already exists' })

      if (password !== confirmPassword)
        return res.status(400).json({ message: 'Passwords do not match' })

      const newUser = new AuthModel({
        name,
        username,
        email,
        password: await AuthSchema.methods.encryptPassword(password),
      })

      await newUser.save()

      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      throw new ErrorHandler('Internal server error', 500)
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password } = req.body
      const getUser = await AuthModel.findOne({ email }).exec()
      if (!getUser) {
        throw new ErrorHandler('User not found', 404)
      }
      const matchPassword = await AuthSchema.methods.comparePassword(
        password,
        getUser.password
      )

      if (!matchPassword) throw new ErrorHandler('Invalid password', 400)

      const token = signToken(
        {
          id: getUser._id,
        },
        '1d'
      )

      return res.status(200).json({
        data: {
          message: 'Login success',
          apikey: token,
          user_id: getUser._id,
        },
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
}
