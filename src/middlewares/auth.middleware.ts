import { verifyToken, signToken } from '../utils/jwt'
import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from './errorHandler.middleware'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['api-token']

  try {
    if (!token) throw new ErrorHandler('Token not found', 401)

    const decoded = verifyToken(token as string)

    if (!decoded) throw new ErrorHandler('Invalid token', 401)

    return decoded
  } catch (error) {
    throw new ErrorHandler('Internal error', 500)
  }
}
