import { Strategy, ExtractJwt } from 'passport-jwt'

import { User } from '../models'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: process.env.PRIVATE_KEY || 'private',
  issuer: process.env.ISSUER || 'sa',
}

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id)
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  }
  catch (e) {
    return done(e, false)
  }
})

export default jwtStrategy
