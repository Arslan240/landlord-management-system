const express = require('express')
const { getAllProperties, addProperty } = require('../controllers/property.controller')
const { authMiddleware, rolesAuthMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

/** FUNCTIONALITIES TO IMPLEMENT
 * add property
 * delete property
 * update property
 * get property
 * get properties
 * Filters in get property e.g. sort by date, renter id, 
 */


// getAllProperties will return properties of this user only, we'll think of admin later
router.get('/', authMiddleware, getAllProperties)
router.post('/', authMiddleware, addProperty)

module.exports = router


