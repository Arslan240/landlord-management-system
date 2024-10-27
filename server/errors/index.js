const { BadRequestError } = require("./BadRequestError")
const { UnAuthenticateError } = require("./UnAuthenticatedError")

module.exports = {
  UnAuthenticateError,
  BadRequestError,
}
