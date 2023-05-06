import { Request, Response, NextFunction } from 'express'

export class ErrorHandler extends Error {
  public statusCode: number

  constructor(public message: string, status: number) {
    super(message)
    this.statusCode = status
  }
}

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode || 500).json({
      response: {
        status: 'error',
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error',
      },
    })
  }

  return next(err.message)
}
