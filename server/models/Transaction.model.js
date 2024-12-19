const mongoose = require("mongoose")
const { PAY_METHOD_BANK_TRANSFER, PAY_METHOD_CREDIT_CARD, PAY_METHOD_CASH } = require("../constants")

// base schema
const baseTransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide amount for payment"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide sender id"],
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide receiver id"],
    },
    paymentMethod: {
      type: String,
      enum: [PAY_METHOD_BANK_TRANSFER, PAY_METHOD_CREDIT_CARD, PAY_METHOD_CASH],
      required: [true, "Please provide payment method"],
    },
    transactionId: {
      //e.g. when payment made using our system or banking system, in case of cash it'll be empty.
      type: String,
      unique: true,
    },
    details: String,
  },
  { timestamps: true, discriminatorKey: "transactionType", collection: "transactions" }
)

const Transaction = mongoose.model("Transaction", baseTransactionSchema)

// discriminator Rent Payment
const rentPaymentSchema = new mongoose.Schema({
  leaseId: {
    type: mongoose.Types.ObjectId,
    ref: "Lease",
    required: [true, "Please provide appropriate lease id"],
  },
})

const RentPayment = Transaction.discriminator("RentPayment", rentPaymentSchema)

// discriminator Maintenance Payment
const maintenancePaymentSchema = new mongoose.Schema({
  maintenanceId: {
    type: mongoose.Types.ObjectId,
    ref: "Maintenance",
    required: [true, "Please provide appropriate maintenance id"],
  },
})

const MaintenancePayment = Transaction.discriminator("MaintenancePayment", maintenancePaymentSchema)

// discriminator Miscellaneous Payment
const miscellaneousPaymentSchema = new mongoose.Schema({
  description: String,
})

const MiscellaneousPayment = Transaction.discriminator("MiscellaneousPayment", miscellaneousPaymentSchema)

module.exports = {
  RentPayment,
  MaintenancePayment,
  MiscellaneousPayment,
}
