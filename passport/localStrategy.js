import local from 'passport-local'
import brypt from 'bcrypt'

import db from '../models'
import { ERROR_MESSAGE } from '../utils'

const { User } = db
const { Strategy } = local

const localStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await User
      .findOne(
        { where: {
          email,
        } },
      )
    if (!user) return done(null, false)
    const isVerified = await brypt.compare(password, user.password)
    if (isVerified) {
      return done(null, {
        id: user.id,
      })
    }
    return done(ERROR_MESSAGE.INVALID_USERNAME_PASSWORD, false)
  }
  catch (e) {
    return done(e, false)
  }
})

export default localStrategy
