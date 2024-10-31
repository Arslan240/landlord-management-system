const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode, message } = err
  console.log(err.statusCode, err.message)
  console.log(err)
  res.status(statusCode || 500).send(message)
}

module.exports = errorHandlerMiddleware
