const { User } = require("../models/User.model")
const { Token } = require("../models/Token.model")
const jwt = require("jsonwebtoken")
const sendVerificationEmail = require("../utils/sendVerificationEmail")
const { BadRequestError, UnAuthenticateError } = require("../errors/")
const { StatusCodes } = require("http-status-codes")
const crypto = require("crypto")
const { attachCookiesToResponse } = require("../utils/jwt")
const { createTokenUser } = require("../utils/createTokenUser")
const { checkTenantUser } = require("../utils/checkTenantUser")

const registerController = async (req, res) => {
  const { name, email, password, idNumber } = req.body

  if (!name || !email || !password || !idNumber) {
    throw new BadRequestError("Please provide all values")
  }

  // email exists
  const emailUnique = await User.findOne({ email })
  if (emailUnique) {
    throw new BadRequestError("Email is already registered")
  }

  // check if id number is already present in Users
  const idNumberNotUnique = await User.findOne({ idNumber })
  if (idNumberNotUnique) {
    throw new BadRequestError("User is already registered")
  }

  // generate jwt token for user
  const verificationToken = crypto.randomBytes(14).toString("hex")

  const firstUser = (await User.countDocuments({})) === 0
  const role = firstUser ? "admin" : "user"

  let userObject = {
    name,
    email,
    password,
    idNumber,
    verificationToken,
    role,
  }

  // check if id Number is present in tenants, if yes then it means the user was an offline tenant which is now registering. So we pass tenant id as user id
  await checkTenantUser(userObject, idNumber)
  console.log(userObject)

  const user = await User.create(userObject)
  if (!user) {
    throw new Error("Something went wrong")
  }

  // send an email to users mail with verification token in it which you get and verify against user and then set the user as verified.
  await sendVerificationEmail({ email, verificationToken })

  res.send({
    user: {
      name,
      email,
      role,
      isVerified: user.isVerified,
    },
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
  user.isVerified = true
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
  console.log(user)
  if (!user) {
    throw new UnAuthenticateError("Invalid credentials")
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new UnAuthenticateError("Invalid credentials")
  }

  const tokenUser = createTokenUser(user)
  // check email verification
  if (!user.isVerified) {
    console.log("user not verified")
    throw new UnAuthenticateError("Please verify your email", {
      user: {
        ...tokenUser,
        isVerified: user.isVerified,
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
    res.status(StatusCodes.OK).json({ user: { ...tokenUser, isVerified: user.isVerified } })
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
  console.log({ user: { ...tokenUser, isVerified: user.isVerified } })
  res.status(StatusCodes.OK).json({ user: { ...tokenUser, isVerified: user.isVerified } })
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
