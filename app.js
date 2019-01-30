import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import Sequelize from 'sequelize'
import passport from 'passport'

import indexRouter from './routes/index'
import usersRouter from './routes/users'

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
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// initialise passport and its strategy
app.use(passport.initialize())
// code to integrate the database connection
const sequilize = new Sequelize('mysql://root:root@localHost:3306/startercode')
sequilize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully ')
  })
  .catch(err => {
    console.error('Unable to connect to database')
  })

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
export {
  sequilize,
}
