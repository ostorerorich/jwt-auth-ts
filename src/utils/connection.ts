import { connect } from 'mongoose'
export const connection = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI as string)

    console.log('Database connected')
  } catch (error) {
    console.log('Error to connect database: ', error)
  }
}
