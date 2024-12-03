require("dotenv").config()
require("express-async-errors")

const express = require("express")
const { connect } = require("./db/connect")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")

// routers
const authRouter = require("./routes/auth.routes")
const propertyRouter = require("./routes/property.routes")
const uploadRouter = require("./routes/upload.routes")
const leaseRouter = require("./routes/lease.routes")
const errorHandlerMiddleware = require("./middlewares/error-handler.middleware")
const notFoundMiddleware = require("./middlewares/notFoundMiddleware")

// TODO: remove 5174 after development
// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
)
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.PRIVATE_KEY))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/properties", propertyRouter)
app.use("/api/v1/upload", uploadRouter)
app.use("/api/v1/leases", leaseRouter)

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
