const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { getPreSignedUrls } = require("../controllers/upload.controller")
const router = express.Router()

// TODO: add auth-middleware, I only removed it during devlopment
router.post("/getsignedurls", getPreSignedUrls)

module.exports = router
