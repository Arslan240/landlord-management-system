require("dotenv").config()
require("express-async-errors")

const express = require("express")
const { connect } = require("./db/connect")
const app = express()

// rouers
const authRouter = require("./routes/auth.routes")
const errorHandlerMiddleware = require("./middlewares/error-handler.middleware")
const notFoundMiddleware = require("./middlewares/notFoundMiddleware")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.PRIVATE_KEY))

app.use("/api/v1/auth", authRouter)

// app.use("/", (req, res) => {
//   res.send("<h2>Hello</h2>")
// })

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const PORT = 4000
const start = async () => {
  try {
    const result = await connect(process.env.MONGO_URI)
    app.listen(4000, () => {
      console.log("server is listening at 4000")
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
