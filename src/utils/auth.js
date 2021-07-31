import jwt from 'jsonwebtoken'

const privateKey = process.env.PRIVATE_KEY || 'private'
const publicKey = process.env.PUBLIC_KEY || 'public'

/** This function generate the token with RSA256 Algorithm
 * @param {string} time The Time at which the token expire
 * @param {Object} payload This is the id of the user
 * @param {Object} signingOption This is the Siging Option of the Server
 * Issuer is the Email of the Signing Authority
 * Subject is the email of the reciept user
 */
export const generateToken = (payload, { issuer, subject }, time = '30d') => {
  const signingOption = {
    issuer,
    subject,
    expiresIn: time,
  }
  return jwt.sign(payload, privateKey, signingOption)
}

/** This function verify whether the recieved token is verified or not
 * @param {String} token The token which is recived by the server
 * @param {Object} signingOption This is the siging option of the server
 * @param {String} time The time at which token expire
 * Issuer is the Email of the Signing Authority
 * Subject is the email of the reciept user
 */
export const verifyToken = (token, { issuer, subject }, time = '30d') => {
  const verifyingOption = {
    issuer,
    subject,
    expiresIn: time,
  }
  try {
    return jwt.verify(token, publicKey, verifyingOption)
  }
  catch (err) {
    throw err
  }
}

/**
 * This function is used to extract the user id from the jwt token
 */
export const decodeToken = token => {
  const decode = jwt.decode(token, { complete: true })
  const { id } = decode.payload
  return id
}
