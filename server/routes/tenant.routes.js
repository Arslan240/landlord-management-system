const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { getTenants, addTenant } = require("../controllers/tenant.controller")
const router = express.Router()

/* TODO: add roles middleware to only allow landlord to access these routes.
 * also on frontend in leases and tenants page check, when first property is added add the role of landlord to the user.
 */
router.route("/").get(authMiddleware, getTenants)
router.route("/").post(authMiddleware, addTenant)

module.exports = router
