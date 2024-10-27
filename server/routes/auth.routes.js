const express = require("express")
const {
  registerController,
  verifyEmailController,
  loginController,
  logoutController,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller")
const { model } = require("mongoose")
const { authMiddleware } = require("../middlewares/auth.middleware")
const router = express.Router()

router.post("/register", registerController)

router.get("/logout", authMiddleware, logoutController)
router.post("/login", loginController)
// TODO,following three are just for time being it should be changed to POST request. and get request should be for frontend endpoint.
router.get("/verify-email", verifyEmailController)
router.get("/forgot-password", forgotPassword)
router.get("/reset-password", resetPassword)

module.exports = router
