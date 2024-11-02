const { User } = require("../models/User.model")
const { Token } = require("../models/Token.model")
const jwt = require("jsonwebtoken")
const sendVerificationEmail = require("../utils/sendVerificationEmail")
const { BadRequestError, UnAuthenticateError } = require("../errors/")
const { StatusCodes } = require("http-status-codes")
const crypto = require("crypto")
const { attachCookiesToResponse } = require("../utils/jwt")
const { createTokenUser } = require("../utils/createTokenUser")

const registerController = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values")
  }

  // email exists
  const emailUnique = await User.findOne({ email })
  if (emailUnique) {
    throw new BadRequestError("Email is already registered")
  }

  // generate jwt token for user
  const verificationToken = crypto.randomBytes(14).toString("hex")

  const firstUser = (await User.countDocuments({})) === 0
  const role = firstUser ? "admin" : "user"

  const user = await User.create({
    name,
    email,
    password,
    verificationToken,
    role,
  })
  if (!user) {
    throw new Error("Something went wrong")
  }

  // send an email to users mail with verification token in it which you get and verify against user and then set the user as verified.
  await sendVerificationEmail({ email, verificationToken })

  res.send({
    user: {
      name, email, role, isVerifed: user.isVerifed
    }
  })
}

const verifyEmailController = async (req, res) => {
  const { email, verificationToken } = req.body

  // does user exists
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnAuthenticateError("Invalid Authentication")
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnAuthenticateError("Invalid Authentication")
  }

  user.verificationToken = ""
  user.isVerifed = true
  user.verifiedDate = Date.now()
  await user.save()

  console.log(email, verificationToken)
  res.status(StatusCodes.OK).json({
    status: "success",
    msg: "Email Verified Successfully",
  })
}

const loginController = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnAuthenticateError("Invalid credentials")
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new UnAuthenticateError("Invalid credentials")
  }

  const tokenUser = createTokenUser(user)
  // check email verification
  if (!user.isVerifed) {
    console.log('user not verified');
    throw new UnAuthenticateError("Please verify your email", {
      user: {
        ...tokenUser,
        isVerifed: user.isVerifed
      },
    })
  }

  let refreshToken = ""
  // if a token exists in db against this user?
  const existingToken = await Token.findOne({ user: user._id })

  // if token exists it means that user has logged in last maybe 5 to 8 hours.
  if (existingToken) {
    if (!existingToken.isValid) {
      throw new UnAuthenticateError("Invalid Authentication")
    }
    const { refreshToken } = existingToken

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: { ...tokenUser, isVerifed: user.isVerifed } })
    return
  }
  // if token doesn't exist
  refreshToken = crypto.randomBytes(14).toString("hex")
  const userAgent = req.headers["user-agent"]
  const ip = req.ip

  await Token.create({
    ip,
    userAgent,
    refreshToken,
    user: user._id,
  })

  // { name: user.name, id: user._id, role: user.role,}
  // const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })
  console.log({ user: { ...tokenUser, isVerifed: user.isVerifed } });
  res.status(StatusCodes.OK).json({ user: { ...tokenUser, isVerifed: user.isVerifed } })
}

const logoutController = async (req, res) => {
  await Token.deleteOne({
    user: req.user.id,
  })

  // remove cookies
  res.cookie("access_token", "logout", {
    expires: new Date(Date.now()),
  })
  res.cookie("refresh_token", "logout", {
    expires: new Date(Date.now()),
  })
  // remove refresh token
  res.status(StatusCodes.OK).send("Logged out successfully")
}

const forgotPassword = (req, res) => {
  res.status(StatusCodes.OK).send("Forgot Password")
}
const resetPassword = (req, res) => {
  res.status(StatusCodes.OK).send("Reset Password")
}

module.exports = {
  registerController,
  verifyEmailController,
  loginController,
  logoutController,
  forgotPassword,
  resetPassword,
}
