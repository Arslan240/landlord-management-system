const mongoose = require("mongoose")
const moment = require("moment")
const Property = require("./Property.model")

const RentHistorySchema = new mongoose.Schema({
  renterId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: [true, "Please provide renterId for RentHistory"],
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: Property,
    default: [true, "Please provide propertyId for RentHistory"],
  },
  rentDate: {
    type: Date,
    required: [true, "Please provide rent date for RentHistory"],
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  paymentId: {
    type: mongoose.Types.ObjectId,
    ref: "RentPayment",
    required: [true, "Please provide paymentId for RentHistory"],
  },
})

// Define the schema method
RentHistorySchema.statics.isRentPaidForCurrentMonth = async function (propertyId, renterId) {
  const startOfMonth = moment().startOf("month").toDate()
  const endOfMonth = moment().endOf("month").toDate()

  const rentRecord = await this.findOne({
    propertyId,
    renterId,
    rentDate: { $gte: startOfMonth, $lte: endOfMonth },
    paymentStatus: "paid",
  })

  return !!rentRecord // returns true if a record is found (rent is paid)
}

const RentHistory = mongoose.model("RentHistory", RentHistorySchema)

module.exports = RentHistory
