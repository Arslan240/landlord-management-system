const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { getTenants, addTenant } = require("../controllers/tenant.controller")
const router = express.Router()

router.route("/").get(authMiddleware, getTenants)
router.route("/").post(authMiddleware, addTenant)

module.exports = router
