const mongoose = require("mongoose")
const moment = require("moment")
const Property = require("./Property.model")
const { RENT_STATUS_UNPAID, RENT_STATUS_PAID } = require("../constants")

const RentHistorySchema = new mongoose.Schema({
  renterId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide renterId for RentHistory"],
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: Property,
    required: [true, "Please provide propertyId for RentHistory"],
  },
  leaseId: {
    type: mongoose.Types.ObjectId,
    ref: "Lease",
    required: [true, "Please provide relevant lease id"],
  },
  rentDate: {
    type: Date,
    required: [true, "Please provide rent date for RentHistory"],
  },
  paymentStatus: {
    type: String,
    enum: [RENT_STATUS_PAID, RENT_STATUS_UNPAID],
    default: RENT_STATUS_UNPAID,
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
