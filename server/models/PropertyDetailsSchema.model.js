const mongoose = require('mongoose')

// Define the subdocument for property details
const PropertyDetailsSchema = new mongoose.Schema({
  sqft: {
    type: Number,
    required: [true, 'Please provide the square footage of the property']
  },
  beds: {
    type: Number,
    required: [true, 'Please provide the number of bedrooms']
  },
  baths: {
    type: Number,
    required: [true, 'Please provide the number of bathrooms']
  },
  garage: {
    type: Number,
    default: 0, // Number of vehicles the garage can fit
  },
  rent: {
    type: Number,
    default: 500
  },
  yearBuilt: {
    type: Number
  },
  furnished: {
    type: Boolean,
    default: false
  },
  petFriendly: {
    type: Boolean,
    default: false
  },
  features: {
    type: [String], // e.g., ["Swimming Pool", "Gym", "Elevator"]
    default: []
  }
});

module.exports = { PropertyDetailsSchema }