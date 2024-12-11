const express = require("express")
const { getLeases, addLease, getSingleLease } = require("../controllers/lease.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")
const router = express.Router()

// TODO: add authorizeRoles middleware as well, only landlords can access this route
router
  .route("/")
  .get(authMiddleware, getLeases) //get all leases
  .post(authMiddleware, addLease) //create new lease

router.route("/:id").get(authMiddleware, getSingleLease)

module.exports = router
