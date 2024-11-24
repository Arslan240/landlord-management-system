const mongoose = require("mongoose")

const leaseSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide appropriate renter Id"],
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
    required: [true, "Please provide appropriate property Id"],
  },
  rentAmount: {
    type: Number,
    required: [true, "Please provide appropriate number"],
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: Date, //if no end date it means the lease will be on going for near future.
})

const Lease = mongoose.model("Lease", leaseSchema)

module.exports = Lease
