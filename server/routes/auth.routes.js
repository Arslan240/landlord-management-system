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

// Auth Routes
router.post("/register", registerController)
router.get("/logout", authMiddleware, logoutController)
router.post("/login", loginController)
router.post("/verify-email", verifyEmailController)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

module.exports = router
