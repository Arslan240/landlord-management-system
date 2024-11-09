const mongoose = require('mongoose')
const { User } = require('./User.model')

/**
 * add property
 * delete property
 * update property
 * get property
 * get properties
 * Filters in get property e.g. sort by date, renter id, 
 */

const PropertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: User,
    required: [true, 'Please provide owner of the property']
  },
  available: {
    type: Boolean,
    default: true
  },
  renter: {
    type: mongoose.Types.ObjectId,
    ref: User
  },
  rent: {
    type: Number,
    default: 500
  },
  ownerHistory: {
    type: [mongoose.Types.ObjectId],
    default: []
  },
  // rentHistory: {} , // a separate model
  // ratings:{}, //setup new model for ratings with stars and comments
}, { timestamps: true })

PropertySchema.pre('save', async function (next) {
  if (!this.isModified('owner')) return
  this.ownerHistory.push(this.owner)
  next()
})

/**
 * https://mongoosejs.com/docs/api/query.html#Query.prototype.getUpdate()
 * when a document is updated, it goes under query update. So, isModified doesn't trigger. 
 * Instead we use this.getUpdate method from mongoose, which gives update object. Read more from docs link.
 */
PropertySchema.pre('updateOne', async function (next) {
  const update = this.getUpdate()

  if (update && update.$set && update.$set.owner) {
    this.setUpdate({
      ...update,
      $push: { ownerHistory: update.$set.owner }
    })
  }
  next()
})

const Property = mongoose.model('Property', PropertySchema)

module.exports = Property



