import express from 'express'

import {
  registerUser,
  loginUser,
} from '../controller/user'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

// Router for Register of user
router.post('/register', (req, res, next) => {
  registerUser(req, res, next)
})

router.post('/login', (req, res, next) => {
  loginUser(req, res, next)
})

export default router
