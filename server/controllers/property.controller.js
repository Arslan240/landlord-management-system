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
  // console.log(req.query)

  const query = { owner: userId }

  generateDBQuery(req.query, query)
  // return res.send(query)

  // console.log(search);

  const propertyFilters = await generatePropertiesFilters()
  const totalItems = await Property.find().countDocuments({ ...query })

  const limit = Number(req.query.limit) || 10
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
  if (!details.baths) {
    throw new BadRequestError("Please provide number of bathrooms")
  }
  if (!details.beds) {
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

// generate proper query for db query
const generateDBQuery = (queryParams, query) => {
  // prettier-ignore
  const { search, rent_min, rent_max, 
    sqft_min, sqft_max, 
    beds_min, beds_max, 
    baths_min, baths_max, 
    year_min, year_max, 
    garage_min, garage_max } = queryParams

  // when there is a search term from search box, its for this. only searches across text based details.
  const textSearchConditions = [
    { "address.plotNo": { $regex: search, $options: "i" } },
    { "address.city": { $regex: search, $options: "i" } },
    { "address.state": { $regex: search, $options: "i" } },
    { "address.street": { $regex: search, $options: "i" } },
    { "address.postalCode": { $regex: search, $options: "i" } },
    { category: { $regex: search, $options: "i" } },
  ]

  if (search) {
    if (query.$or) {
      query.$or.push(...textSearchConditions)
    } else query.$or = textSearchConditions
  }

  let rentQuery = {}
  if (rent_min && rent_max) {
    rentQuery = { "details.rent": { $gte: Number(rent_min), $lte: Number(rent_max) } }
  } else if (rent_min) {
    rentQuery = { "details.rent": { $eq: Number(rent_min) } }
  }

  let sqftQuery = {}
  if (sqft_min && sqft_max) {
    sqftQuery = { "details.sqft": { $gte: Number(sqft_min), $lte: Number(sqft_max) } }
  } else if (sqft_min) {
    sqftQuery = { "details.sqft": { $eq: Number(sqft_min) } }
  }

  let bedsQuery = {}
  if (beds_min && beds_max) {
    bedsQuery = { "details.beds": { $gte: Number(beds_min), $lte: Number(beds_max) } }
  } else if (beds_min) {
    bedsQuery = { "details.beds": { $eq: Number(beds_min) } }
  }

  let bathsQuery = {}
  if (baths_min && baths_max) {
    bathsQuery = { "details.baths": { $gte: Number(baths_min), $lte: Number(baths_max) } }
  } else if (baths_min) {
    bathsQuery = { "details.baths": { $eq: Number(baths_min) } }
  }

  let yearQuery = {}
  if (year_min && year_max) {
    yearQuery = { "details.yearBuilt": { $gte: Number(year_min), $lte: Number(year_max) } }
  } else if (year_min) {
    yearQuery = { "details.yearBuilt": { $eq: Number(year_min) } }
  }

  let garageQuery = {}
  if (garage_min && garage_max) {
    garageQuery = { "details.garage": { $gte: Number(garage_min), $lte: Number(garage_max) } }
  } else if (garage_min) {
    garageQuery = { "details.garage": { $eq: Number(garage_min) } }
  }

  // it passes all the created queryObjects to function to create a $and array of them.
  addTo$ANDQuery([rentQuery, sqftQuery, bedsQuery, bathsQuery, yearQuery, garageQuery], query)
  // console.log(query)
  return query
}

/**
 * Adds query filters to $and array of MongoDB query object based on given query parameters. If no $and it'll be created otherwise appended to already present $and array
 *
 * @param {Object | Array} queriesToBeAdded - A single object or an array of objects i.e. object with mongodb filter syntax.
 * like: `{ "details.garage": { $eq: Number(garage_min) } }`
 * @param {Object} query - The base query object to which the $and array containing `queriesToBeAdded` filters will be added.
 * @returns {Object} The modified query object with additional filters.
 */
const addTo$ANDQuery = (queriesToBeAdded, queryObj) => {
  if (!queryObj.$and) {
    queryObj.$and = []
  }

  if (Array.isArray(queriesToBeAdded)) {
    const populatedQueries = queriesToBeAdded.filter((item) => Object.keys(item).length > 0)

    if (populatedQueries.length >= 0) {
      queryObj.$and.push(...populatedQueries)
    }
  } else {
    if (Object.keys(queriesToBeAdded).length > 0) {
      queryObj.$and.push(queriesToBeAdded)
    }
  }

  // because we can't have an empty $and/$or/$nor array in mongo db query object. If it's empty we just delete it.
  if (queryObj.$and?.length === 0) delete queryObj.$and
}

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
    rent: { index: 0, name: "rent", min: rentRange?.min, max: rentRange?.max },
    sqft: { index: 1, name: "sqft", min: sqftRange?.min, max: sqftRange?.max },
    beds: { index: 2, name: "beds", min: bedsRange?.min, max: bedsRange?.max },
    baths: { index: 3, name: "baths", min: bathsRange?.min, max: bathsRange?.max },
    year: { index: 4, name: "year", min: yearBuiltRange?.min, max: yearBuiltRange?.max },
    garage: { index: 5, name: "garage", min: garageRange?.min, max: garageRange?.max },
  }
}
