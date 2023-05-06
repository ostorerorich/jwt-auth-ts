import { sign, verify } from 'jsonwebtoken'

export const signToken = (payload: Object, expiresIn: string) => {
  return sign(payload, <string>process.env.JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string) => {
  return verify(token, <string>process.env.JWT_SECRET)
}
