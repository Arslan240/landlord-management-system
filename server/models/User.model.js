const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
    enum: ["admin", "landlord", "tenant"], //user is both landlord and tenant based on his acivity.
    default: ["user"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
  verificationToken: String,
  verifiedDate: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
})

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
