const { StatusCodes } = require("http-status-codes")
const Property = require("../models/Property.model")
const { BadRequestError, UnAuthorizedError, NotFoundError } = require("../errors")
const { User } = require("../models/User.model")

const getAllProperties = async (req, res) => {
  const { id: userId } = req.user

  // double check if user exists or not
  const user = await User.findById(userId)
  if(!user){
    throw new UnAuthorizedError('You\'re not authorized access this resource')
  }

  const properties = await Property.find({
    owner: userId
  })

  res.status(StatusCodes.OK).json({ data: properties })
}

const getSingleProperty = async (req,res) => {
  const {id:propertyId} = req.params
  const {id: owner} = req.user

  if(!propertyId) {
    return res.status(StatusCodes.OK).json({data: []})
  }

  const property = await Property.findOne({_id: propertyId, owner})
  if(!property){
    throw new NotFoundError('Property not found')
  }

  res.status(StatusCodes.OK).json({
    data: property
  })
}

const addProperty = async (req, res) => {
  const data = req.body
  const { id: owner } = req.user
  const { address, details, ...rest } = data

  console.log(req.user);

  if (!owner) {
    throw new BadRequestError('Please provide owner')
  }
  if (!details) {
    throw new BadRequestError('Please provide complete details')
  }
  if (!details.sqft) {
    throw new BadRequestError('Please provide sqft')
  }
  if (!details.bathrooms) {
    throw new BadRequestError('Please provide number of bathrooms')
  }
  if (!details.bedrooms) {
    throw new BadRequestError('Please provide number of bedrooms')
  }
  if (!address) {
    throw new BadRequestError('Please provide complete address')
  }

  const user = await User.findById(owner)
  if (!user) {
    console.log('user doesn\'t exist');
    throw new BadRequestError('User doesn\'t exist')
  }

  const property = await Property.create({
    owner,
    address,
    ...rest,
    details
  })

  if (!property) {
    console.log('user not created in addProperty controller');
    throw new Error('Something went wrong')
  }

  res.status(StatusCodes.CREATED).send({ property })
}


module.exports = {
  getAllProperties,
  getSingleProperty,
  addProperty
}

// TODO: find validation error type in error handler middleware, and find a way to show the error in a better way. for address. just send back the error address is not complete.