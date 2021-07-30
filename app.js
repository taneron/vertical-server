import express from 'express'
import cors from 'cors'
import AppError from './utils/appError.js'
import globalErrorHandler from './utils/errorController.js'
import plantRouter from './routes/plantRoutes.js'
import entryRouter from './routes/entryRoutes.js'
import ErrorHandler from './utils/errorController'
// import morgan from 'morgan' //!DEV

const app = express()
app.use(
  cors({
    origin: ['https://vertical.netlify.app/', 'https://vertical.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })
)

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: '*' }))

  // app.use(morgan('dev'))
}
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.static('public'))

app.use('/api/v1/plant', plantRouter)
app.use('/api/v1/entry', entryRouter)

//404 Router
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

ErrorHandler
app.use(globalErrorHandler)

export default app
