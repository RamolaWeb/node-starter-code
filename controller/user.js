import { decodeToken, success, error, ERROR_MESSAGE } from '../utils'
import { User } from '../models'

// This function is used to show the current user profile
export const fetchMyProfile = async (req, res) => {
  // Fetch The JWT token from the Header
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]

    // extract the user id from the payload by decoding the jwt
    const userId = decodeToken(token)

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

  const e = {
    message: ERROR_MESSAGE.INVALID_TOKEN,
  }
  return error(res, e)
}
