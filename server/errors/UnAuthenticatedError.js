const { StatusCodes } = require("http-status-codes")
const CustomError = require("./CustomError")

class UnAuthenticateError extends CustomError {
  constructor(message, data) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
    this.data = data
  }
}

module.exports = {
  UnAuthenticateError,
}
