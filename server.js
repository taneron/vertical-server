import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })

process.on('uncaughtException', (err) => {
  console.log('🎑🧧🎃🎊🎉✨', err)
  console.log('UNCAUGHT EXCEPTION! 💥')
  console.log(err.name, err.message)
  process.exit(1)
})

import mongoose from 'mongoose'
import app from './app'
import AppError from './utils/appError'

const DB = process.env.DB_LINK

if (!DB) new AppError('Could not connect to the DB', 503)
else
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log(`DB connection successful ${DB.includes('localhost') ? 'in DEV' : 'in Prod'}`)
    )

const port = process.env.PORT || 5000
const server = app.listen(port)
console.log(`🚀🚀🚀 on port ${port} in ${process.env.NODE_ENV} 🖥`)

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥.')
  // @ts-ignore
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED.')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})
