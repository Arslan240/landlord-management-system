const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ msg: "Resource not found" })
}

module.exports = notFoundMiddleware
