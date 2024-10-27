const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode, message } = err
  console.log(err.statusCode, err.message)
  console.log(err)
  res.send(err.message)
}

module.exports = errorHandlerMiddleware
