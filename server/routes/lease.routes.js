const express = require("express")
const { getLeases, addLease } = require("../controllers/lease.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")
const router = express.Router()

router
  .route("/")
  .get(authMiddleware, getLeases) //get all leases
  .post(authMiddleware, addLease) //create new lease

module.exports = router
