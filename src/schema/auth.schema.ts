import { z } from 'zod'

export const authRegister = z.object({
  name: z.string().nonempty({ message: 'Name is required' }).min(3).max(16),
  username: z
    .string()
    .nonempty({ message: 'Username is required' })
    .min(3)
    .max(16),
  email: z.string().nonempty({ message: 'Email is required' }).email(),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(6)
    .max(32),
  confirmPassword: z
    .string()
    .nonempty({ message: 'Confirmpassword is required' })
    .min(6)
    .max(32),
})

export const authLogin = z.object({
  email: z.string().nonempty({ message: 'Email is required' }).email(),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(6)
    .max(32),
})
