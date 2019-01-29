import JWTStrategy from 'passport-jwt'

import { User } from '../models'

const { Strategy, ExtractJwt } = JWTStrategy

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRIVATE_KEY || 'private',
  issuer: process.env.ISSUER || 'issuer',
  audience: process.env.AUDIENCE || 'auidence',
}

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User
      .findOne(
        { where: {
          id: payload.id,
        } },
      )
    if (!user) return done(null, false)
    return done(null, user)
  }
  catch (e) {
    return done(e, false)
  }
})

export {
  jwtStrategy,
}
