import { success, error, ERROR_MESSAGE } from '../utils'
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
