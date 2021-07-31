import { Strategy as LocalStrategy } from 'passport-local'
import brypt from 'bcrypt'

import { User } from '../models'
import { ERROR_MESSAGE } from '../utils'

const localStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User
        .findOne(
          { email: username },
        )
      if (!user) return done(null, false)
      const isVerified = await brypt.compare(password, user.password)
      if (isVerified) {
        return done(null, user)
      }
      return done(ERROR_MESSAGE.INVALID_USERNAME_PASSWORD, false)
    }
    catch (e) {
      console.log(e)
      return done(e, false)
    }
  },
)

export default localStrategy
