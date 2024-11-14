const mongoose = require("mongoose")
const { User } = require("./User.model")
const { PropertyDetailsSchema } = require("./PropertyDetailsSchema.model")

/**
 * sqft
 * bathrooms
 * bedrooms
 */

const PropertySchema = new mongoose.Schema(
  {
    name: String,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: [true, "Please provide owner of the property"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    renter: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    ownerHistory: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    details: {
      type: PropertyDetailsSchema,
      required: true,
    },
    address: {
      plotNo: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    category: {
      type: String,
      enum: ["Apartment", "Single Family House", "Townhouse", "Condo"],
      default: "Single Family House",
    },
    images: {
      type: [String],
      default: ["https://photos.zillowstatic.com/fp/c1dc9043991fb7e87daf3d69287569a3-p_e.webp"],
    },
    // rentHistory: {} , // a separate model
    // ratings:{}, //setup new model for ratings with stars and comments
  },
  { timestamps: true }
)

// indexes
PropertySchema.index(
  {
    "address.plotNo": 1,
    "address.street": 1,
    "address.city": 1,
    "address.state": 1,
    "address.postalCode": 1,
  },
  { unique: true }
)

PropertySchema.pre("save", async function (next) {
  if (!this.isModified("owner")) return
  this.ownerHistory.push(this.owner)
  next()
})

/**
 * https://mongoosejs.com/docs/api/query.html#Query.prototype.getUpdate()
 * when a document is updated, it goes under query update. So, isModified doesn't trigger.
 * Instead we use this.getUpdate method from mongoose, which gives update object. Read more from docs link.
 */
PropertySchema.pre("updateOne", async function (next) {
  const update = this.getUpdate()

  if (update && update.$set && update.$set.owner) {
    this.setUpdate({
      ...update,
      $push: { ownerHistory: update.$set.owner },
    })
  }
  next()
})

const Property = mongoose.model("Property", PropertySchema)

module.exports = Property
