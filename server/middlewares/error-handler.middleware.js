const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode, message,data } = err

  console.log(err.statusCode, err.message)
  console.log(err)
  
  // this counts on that there is only one error like this
  if (message === 'Please verify your email'){ // same message in login controller
    res.status(statusCode || 500).json({
      msg: message,
      user: data
    })
  }

  res.status(statusCode || 500).send(message)
}

module.exports = errorHandlerMiddleware
