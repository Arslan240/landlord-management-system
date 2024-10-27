const { UnAuthenticateError } = require("../errors")
const { Token } = require("../models/Token.model")
const {
  verifyToken,
  attachCookiesToResponse,
  refreshAccessToken,
} = require("../utils/jwt")
const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
  //   const { access_token, refresh_token } = req.signedCookies //only work in production
  let { access_token, refresh_token } = req.signedCookies
  console.log(access_token, refresh_token)

  try {
    // if access token exists we'll use that first and check if its valid, if its invalid, we'll directly go to invalid authentication and wont check refresh token
    if (access_token) {
      const payload = verifyToken(access_token)
      req.user = payload.user
      console.log("Access_token valid")
      return next()
    }

    // if no access_token, then check refresh token
    const { user, refreshToken } = verifyToken(refresh_token) //tells, our system has signed the token
    const existingToken = await Token.findOne({
      user: user.id,
      refreshToken,
    })
    if (!existingToken || !existingToken?.isValid) {
      console.log("existing refresh token either absent or invalid")
      console.log(existingToken)
      throw new UnAuthenticateError("Invalid Authentication")
    }

    attachCookiesToResponse({
      res,
      user,
      refreshToken: existingToken.refreshToken,
    })
    console.log("refresh_token valid")

    next()
  } catch (error) {
    throw new UnAuthenticateError("Invalid Authentication")
  }
}

module.exports = {
  authMiddleware,
}
