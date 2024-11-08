const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode, message,data } = err

  console.log(err.statusCode, err.message)
  console.log(err)
  
  // this counts on that there is only one error like this
  if (message === 'Please verify your email'){ // same message in login controller
    return res.status(statusCode || 500).json({
      msg: message,
      user: data
    })
  }

  return res.status(statusCode || 500).send(message)
}

module.exports = errorHandlerMiddleware
