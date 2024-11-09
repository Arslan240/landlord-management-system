const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class NotFoundError extends CustomError{
  constructor(message,data){
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
    this.data = data
  }
}

module.exports = {
  NotFoundError
}