const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

// TODO: add gender in user and on frontend. Also update all the controllers to get the placeholder avatar using the gender and complete name.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: 5,
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      message: "Please provide email",
      validator: validator.isEmail,
    },
  },
  role: {
    type: [String],
    enum: ["admin", "landlord", "tenant", "user"], //user is both landlord and tenant based on his acivity.
    default: ["user"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
  idNumber: {
    type: String,
    required: [true, ["Please provide govt identification number"]],
    unique: true,
  },
  verificationToken: String,
  verifiedDate: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
})

UserSchema.index({ idNumber: 1, email: 1 }, { unique: true })

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  const salt = await bcrypt.genSalt(14)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const res = await bcrypt.compare(candidatePassword, this.password)
  return res
}

const User = mongoose.model("User", UserSchema)

module.exports = {
  User,
}
