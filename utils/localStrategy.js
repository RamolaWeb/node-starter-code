import Strategy from 'passport-local'
import brypt from 'bcrypt'

import { User } from '../models'
import { ERROR_MESSAGE } from './constant'

const { LocalStrategy } = Strategy

const localStrategy = new LocalStrategy(async (email, password, done) => {
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

export {
  localStrategy,
}
