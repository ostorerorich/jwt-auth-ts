import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from './errorHandler.middleware'
import { JwtPayload, verify } from 'jsonwebtoken'
import { AuthModel } from '../models/auth.model'

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer'))
    return next(new ErrorHandler('Token doesnt exist', 400))
  const token = authorization.split(' ')[1]

  verify(token, <string>process.env.JWT_SECRET, (err, payload) => {
    if (err) next(new ErrorHandler('Error token', 400))
  })

  next()
}
