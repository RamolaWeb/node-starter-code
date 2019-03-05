import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'

import { generateToken } from '../utils'

import { User } from '../models'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

// Router for Register of user
router.post('/register', async (req, res, next) => {
  const { email, pass, name } = req.body
  try {
    const password = await bcrypt.hash(pass, 10)
    const userDocument = new User({ email, password, name })
    await userDocument.save()
    const message = {
      status: true,
      message: 'User Created Successfully',
    }
    res.status(200).json(message)
  }
  catch (e) {
    const error = {
      status: false,
      message: e.message,
    }
    res.status(400).json(error)
  }
})

router.post('/login', (req, res, next) => {
  console.log('getting', req.body)
  passport.authenticate('local',
    { session: false },
    (error, user) => {
      if (error || !user) {
        res.status(400).json({ error })
      }
      const payload = {
        id: user.id,
      }

      req.login(payload, { session: false }, e => {
        if (e) {
          res.status(400).send({ e })
        }
        const token = generateToken(payload, {
          issuer: 'sa',
          subject: 'sa',
        })

        const message = {
          success: true,
          token,
        }
        res.status(200).json(message)
      })
    })(req, res, next)
})

export default router
