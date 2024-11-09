const express = require('express')
const { getAllProperties, addProperty,getSingleProperty } = require('../controllers/property.controller')
const { authMiddleware, rolesAuthMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

// getAllProperties will return properties of this user only, we'll think of admin later
router.get('/', authMiddleware, getAllProperties)
router.get('/:id',authMiddleware, getSingleProperty)
router.post('/', authMiddleware, addProperty)

module.exports = router


