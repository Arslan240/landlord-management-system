const mongoose = require("mongoose")

const TenantSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      default: null, // null for offline tenant (i.e not a registered user on rently)
    },
    createdBy: {
      // for offline tenant, landlord id will be stored
      type: String,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: [true, "Please provide name for tenant"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide date of birth for tenant"],
    },
    occupation: {
      type: String,
      required: [true, "Please provide occupation of the tenant"],
    },
    idNumber: {
      type: String,
      unique: true,
      required: [true, "Please provide govt identification number"],
    },
    salary: Number,
    imageId: {
      type: String,
    },
    isOffline: {
      type: Boolean,
      default: true, // true if tenant is offline
    },
  },
  { timestamps: true }
)

TenantSchema.indexes({ idNumber: 1 }, { unique: true })

const Tenant = mongoose.model("Tenant", TenantSchema)

module.exports = {
  Tenant,
}
