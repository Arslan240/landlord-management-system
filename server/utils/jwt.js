const jwt = require("jsonwebtoken")

const createJwt = (payload) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY)
}

const verifyToken = (candidateToken) => {
  return jwt.verify(candidateToken, process.env.PRIVATE_KEY)
}

const refreshAccessToken = async (refreshToken) => {
  const payload = verifyToken(refreshToken)
}

const attachCookiesToResponse = async ({ res, user, refreshToken }) => {
  // console.log("attaching cookies", res)
  const access_tokenJWT = createJwt({ user })
  const refresh_tokenJWT = createJwt({ user, refreshToken })

  const oneDay = 1000 * 60 * 60 * 24
  const longerExp = 1000 * 60 * 60 * 24 * 30

  res.cookie("access_token", access_tokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })

  res.cookie("refresh_token", refresh_tokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longerExp),
  })
}

module.exports = {
  createJwt,
  verifyToken,
  attachCookiesToResponse,
  refreshAccessToken,
}
