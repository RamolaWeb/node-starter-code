import bcrypt from 'bcrypt'
import passport from 'passport'

import { success, error, ERROR_MESSAGE, generateToken } from '../utils'
import { User } from '../models'

// This function is used to show the current user profile
export const fetchMyProfile = async (req, res) => {
  // extract the user id from the res
  const userId = req.user.id

  // Query the DB with the user id to get all the information
  const user = await User.findById(userId)
  if (user) {
    return success(res, user)
  }

  const e = {
    message: ERROR_MESSAGE.USER_NOT_FOUND,
  }
  return error(res, e)
}

// This function is used to register the user
export const registerUser = async (req, res) => {
  const { email, pass, name } = req.body
  try {
    const isUserExist = await User.findOne({email})
    if (isUserExist) {
      const message = {
        message: ERROR_MESSAGE.USER_EXIST,
      }
      return error(res, message)
    }
    const password = await bcrypt.hash(pass, 10)
    const userDocument = new User({ email, password, name })
    await userDocument.save()
    const message = {
      message: 'User Created Successfully',
    }
    return success(res, message)
  }
  catch (e) {
    const err = {
      message: e.message,
    }
    return error(res, err)
  }
}

// This user is used to login the user
export const loginUser =  (req, res, next) => {
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
          token,
        }
        return success(res, message)
      })
  })(req, res, next)
}