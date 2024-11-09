const { StatusCodes } = require("http-status-codes")
const Property = require("../models/Property.model")

const getAllProperties = async (req,res) => {
  const properties = await Property.find({})


  res.status(StatusCodes.OK).json({data:properties})
}


module.exports = {
  getAllProperties
}