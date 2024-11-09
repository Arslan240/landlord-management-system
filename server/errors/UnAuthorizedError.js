const { StatusCodes } = require("http-status-codes")
const CustomError = require("./CustomError")

class UnAuthorizedError extends CustomError {
  constructor(message, data) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
    this.data = data
  }
}

module.exports = {
  UnAuthorizedError,
}
