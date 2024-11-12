const { StatusCodes } = require("http-status-codes")
const Property = require("../models/Property.model")
const { BadRequestError, UnAuthorizedError, NotFoundError } = require("../errors")
const { User } = require("../models/User.model")

const getAllProperties = async (req, res) => {
  const userId = req.user.id

  // double check if user exists or not
  const user = await User.findById(userId)
  if (!user) {
    throw new UnAuthorizedError("You're not authorized access this resource")
  }

  const { search, beds, baths } = req.query

  // when there is a search term from search box, its for this. only searches across text based details.
  const query = { owner: userId }

  const textSearchConditions = [
    { "address.city": { $regex: search, $options: "i" } },
    { "address.state": { $regex: search, $options: "i" } },
    { "address.postalCode": { $regex: search, $options: "i" } },
    { "address.street": { $regex: search, $options: "i" } },
    { category: { $regex: search, $options: "i" } },
  ]
  const bathsQuery = { "details.baths": { $gte: baths && Number(baths) } }
  const bedsQuery = { "details.beds": { $gte: beds && Number(beds) } }

  if (search) {
    if (query.$or) {
      query.$or.push(...textSearchConditions)
    } else query.$or = [...textSearchConditions]
  }

  if (baths) {
    if (query.$and) {
      query.$and.push(bathsQuery)
    } else query.$and = [bathsQuery]
  }
  if (beds) {
    if (query.$and) {
      query.$and.push(bedsQuery)
    } else query.$and = [bedsQuery]
  }

  // return res.send(query)

  // console.log(search);

  const propertyFilters = await generatePropertiesFilters()
  const totalItems = await Property.find().countDocuments({ ...query })

  const limit = Number(req.query.limit) || 2
  const page = Number(req.query.page) || 1
  const skip = (page - 1) * limit
  const pageCount = Math.ceil(totalItems / limit)

  const properties = await Property.find({
    ...query,
  })
    .skip(skip)
    .limit(limit)

  res.status(StatusCodes.OK).json({
    data: {
      properties,
      filters: propertyFilters,
    },
    meta: {
      pagination: {
        totalItems,
        page,
        pageCount,
        limit, //can also be sent as pageSize
      },
    },
  })
}

const getSingleProperty = async (req, res) => {
  const { id: propertyId } = req.params
  const { id: owner } = req.user

  if (!propertyId) {
    return res.status(StatusCodes.OK).json({ data: [] })
  }

  const property = await Property.findOne({ _id: propertyId, owner })
  if (!property) {
    throw new NotFoundError("Property not found")
  }

  res.status(StatusCodes.OK).json({
    data: property,
  })
}

const addProperty = async (req, res) => {
  const data = req.body
  const { id: owner } = req.user
  const { address, details, ...rest } = data

  console.log(req.user)

  if (!owner) {
    throw new BadRequestError("Please provide owner")
  }
  if (!details) {
    throw new BadRequestError("Please provide complete details")
  }
  if (!details.sqft) {
    throw new BadRequestError("Please provide sqft")
  }
  if (!details.bathrooms) {
    throw new BadRequestError("Please provide number of bathrooms")
  }
  if (!details.bedrooms) {
    throw new BadRequestError("Please provide number of bedrooms")
  }
  if (!address) {
    throw new BadRequestError("Please provide complete address")
  }

  const user = await User.findById(owner)
  if (!user) {
    console.log("user doesn't exist")
    throw new BadRequestError("User doesn't exist")
  }

  const property = await Property.create({
    owner,
    address,
    ...rest,
    details,
  })

  if (!property) {
    console.log("user not created in addProperty controller")
    throw new Error("Something went wrong")
  }

  res.status(StatusCodes.CREATED).send({ property })
}

module.exports = {
  getAllProperties,
  getSingleProperty,
  addProperty,
}

// TODO: find validation error type in error handler middleware, and find a way to show the error in a better way. for address. just send back the error address is not complete.

// Property Filters Generator
const generatePropertiesFilters = async () => {
  const [rentRange] = await Property.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$details.rent" },
        max: { $max: "$details.rent" },
      },
    },
  ])

  const [sqftRange] = await Property.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$details.sqft" },
        max: { $max: "$details.sqft" },
      },
    },
  ])
  const [bedsRange] = await Property.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$details.beds" },
        max: { $max: "$details.beds" },
      },
    },
  ])
  const [bathsRange] = await Property.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$details.baths" },
        max: { $max: "$details.baths" },
      },
    },
  ])
  const [yearBuiltRange] = await Property.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$details.yearBuilt" },
        max: { $max: "$details.yearBuilt" },
      },
    },
  ])
  const [garageRange] = await Property.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$details.garage" },
        max: { $max: "$details.garage" },
      },
    },
  ])

  return {
    rentRange: { name: "rent", min: rentRange?.min, max: rentRange?.max },
    sqftRange: { name: "sqft", min: sqftRange?.min, max: sqftRange?.max },
    bedsRange: { name: "beds", min: bedsRange?.min, max: bedsRange?.max },
    bathsRange: { name: "baths", min: bathsRange?.min, max: bathsRange?.max },
    yearBuiltRange: { name: "year", min: yearBuiltRange?.min, max: yearBuiltRange?.max },
    garageRange: { name: "garages", min: garageRange?.min, max: garageRange?.max },
  }
}
