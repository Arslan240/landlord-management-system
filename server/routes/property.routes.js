const express = require('express')
const { getAllProperties } = require('../controllers/property.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', authMiddleware, getAllProperties)

module.exports = router


