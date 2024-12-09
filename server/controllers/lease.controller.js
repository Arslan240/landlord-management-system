const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnAuthenticateError, NotFoundError } = require("../errors")
const { User } = require("../models/User.model")
const Lease = require("../models/Lease.model")
const Property = require("../models/Property.model")
const sendLeaseAcceptanceEmail = require("../utils/sendLeaseAcceptanceEmail")

const getLeases = async (req, res) => {
  res.send("Get Leases")
}
const addLease = async (req, res) => {
  const { tenantDetails, propertyDetails } = req.body
  const { isOffline, name, email, idNumber, occupation, dob, salary } = tenantDetails
  const { propertyId, rent, deposit, startDate, endDate, terms } = propertyDetails

  if (!propertyId || !rent || !startDate) {
    throw new BadRequestError("Please provide Property, Rent and startDate for lease")
  }

  // if online tenant, send email of lease request to user's email
  if (!isOffline) {
    if (!email || !name || !idNumber || !occupation) {
      throw new BadRequestError("Please provide Name, Email, Occupation and Govt Id of tenant")
    }

    const tenant = await User.findOne({ email, idNumber })
    if (!tenant) {
      throw new BadRequestError(`Tenant with ${email} and Govt Id ${idNumber} doesn't exist. Please correct tenant details and submit again`)
    }

    const propertyOwns = await Property.findOne({ _id: propertyId })
    if (!propertyOwns) {
      throw new NotFoundError("Property not found. Please check property details")
    }

    if (propertyOwns.owner !== req.user.id) {
      throw new UnAuthenticateError("Access denied. Please verify your credentials")
    }

    const lease = await Lease.create({ propertyId, rent, deposit, startDate, endDate, terms })
    if (!lease) {
      throw new Error("Lease didn't create, Please try again")
    }

    await sendLeaseAcceptanceEmail({ email, name, leaseDetails: { address: propertyOwns.address, leaseId: lease._id } })
    console.log("Accept lease email sent successfully")
    res.status(StatusCodes.CREATED).json({ msg: `Lease request is sent to ${name}. Please wait patiently, you'll be notified on acceptance.` })
  }

  // if tenant is offline and we need to call add tenant controller from here, then call add lease controller with property id and newly created tenant id
  // landlord should own the property, if not then unauthorised error, also maybe invalid the refresh token, and logout the user.
  // if already rejected / cancelled, you can't change the status

  res.send({ msg: "Add new Lease", body: req.body })
  // return res.status(StatusCodes.OK).json({ msg: `Email sent successfully to ${name} at ${email}. Please wait for acceptance of lease.` })
}

module.exports = {
  getLeases,
  addLease,
}
