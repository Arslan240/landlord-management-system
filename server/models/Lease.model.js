const mongoose = require("mongoose")

const leaseSchema = new mongoose.Schema({
  tenantId: {
    // tenant idnot required because we create a lease first for online tenant if he accepts the request then we update the tenantId here.
    // Also when a user is not tenant already but accepts the lease, then he will be directed to a new page where he will complete his info about becoming a tenant.
    // Then tenant will be created with similar userid and tenant id will be passed to add lease to change status to accepted.
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
    required: [true, "Please provide appropriate property Id"],
  },
  landlordId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  rent: {
    type: Number,
    required: [true, "Please provide appropriate number"],
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  deposit: Number,
  endDate: Date, //if no end date it means the lease will be on going for near future.
  terms: String,
  status: {
    // rejected: tenant rejects, cancelled: landlord withdraws, if already rejected / cancelled, you can't change the status
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled"],
    default: "pending",
  },
})

const Lease = mongoose.model("Lease", leaseSchema)

module.exports = Lease
