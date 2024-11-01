const { StatusCodes } = require("http-status-codes")
const CustomError = require("./CustomError")

class BadRequestError extends CustomError {
  constructor(message, data) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    this.data = data
  }
}

module.exports = {
  BadRequestError,
}
