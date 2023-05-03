import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/errorHandler.middleware'
import AuthRouter from './routes/auth.route'
import { connection } from './utils/connection'
config()

connection()
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.use('/auth', AuthRouter)
app.listen(3000, () => {
  console.log('Server on port 3000')
})
