import express from 'express'
import cors from 'cors'
import AppError from './utils/appError'
import globalErrorHandler from './utils/errorController'
import plantRouter from './routes/plantRoutes'
import entryRouter from './routes/entryRoutes'

const app = express()
app.use(cors({ origin: '*' })) //NOTE not secure
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.static('public'))

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use('/api/v1/plant', plantRouter)
app.use('/api/v1/entry', entryRouter)

//404 Router
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

//ErrorHandler
app.use(globalErrorHandler)

export default app
