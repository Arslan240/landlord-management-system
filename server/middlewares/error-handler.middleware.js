const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode, message, data } = err

  console.log(err.statusCode, err.message)
  console.log(err)

  // this counts on that there is only one error like this
  if (message === "Please verify your email") {
    // same message in login controller
    return res.status(statusCode || 500).json({
      msg: message,
      user: data,
    })
  }

  return res.status(statusCode || 500).send({ msg: message })
}

module.exports = errorHandlerMiddleware

// TODO: handle mongodb error of duplicate key
/**
 * E11000 duplicate key error collection:
 * LANDLORD.properties index: address.plotNo_1_address.street_1_address.city_1_address.state_1_address.postalCode_1
 * dup key: { address.plotNo: "h", address.street: "h", address.city: "h", address.state: "h", address.postalCode: "h" }
 */
