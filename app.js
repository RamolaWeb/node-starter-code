import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import passport from 'passport'
import mongoose from 'mongoose'

import indexRouter from './routes/index'
import usersRouter from './routes/users'

import './passport'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// initialise passport and its strategy
app.use(passport.initialize())

// code to initialise the database
const defaultDBUrl = 'mongodb://127.0.0.1/node-starter-code'
mongoose.connect(process.env.DB_URL || defaultDBUrl)


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
