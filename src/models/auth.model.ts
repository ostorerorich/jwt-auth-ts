import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface Auth {
  name: string
  username: string
  password: string
  email: string
}

export const AuthSchema = new Schema<Auth>(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

AuthSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10)

  return bcrypt.hash(password, salt)
}

AuthSchema.methods.comparePassword = async function (
  reqPassword: string,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(reqPassword, password)
}

export const AuthModel = model<Auth>('Auth', AuthSchema)
