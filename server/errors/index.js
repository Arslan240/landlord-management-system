const { BadRequestError } = require("./BadRequestError")
const { NotFoundError } = require("./NotFoundError")
const { UnAuthenticateError } = require("./UnAuthenticatedError")
const { UnAuthorizedError } = require("./UnAuthorizedError")

module.exports = {
  UnAuthenticateError,
  BadRequestError,
  UnAuthorizedError,
  NotFoundError
}
