const { BadRequestError, NotFoundError, UnAuthenticateError } = require("../errors")
const Lease = require("../models/Lease.model")
const Property = require("../models/Property.model")
const sendLeaseAcceptanceEmail = require("../utils/sendLeaseAcceptanceEmail")

async function addLeaseService({ tenantDetails, propertyDetails, landlordId }) {
  const { propertyId, rent, deposit, startDate, endDate, terms } = propertyDetails
  const { isOffline, email, name, _id: tenantId } = tenantDetails

  if (!isOffline && !email) {
    throw new BadRequestError("Please provide email for an online user")
  }

  const propertyOwns = await Property.findOne({ _id: propertyId, owner: landlordId })
  if (!propertyOwns) {
    throw new NotFoundError("Property not found. Please check property details")
  }

  if (propertyOwns.owner.toString() !== landlordId) {
    throw new UnAuthenticateError("Access denied. Please verify your credentials")
  }

  let status
  if (isOffline) {
    status = "accepted"
  }
  const lease = await Lease.create({ tenantId, propertyId, rent, deposit, startDate, endDate, terms, status })
  if (!lease) {
    throw new Error("Lease didn't create, Please try again")
  }
  if (!isOffline) {
    await sendLeaseAcceptanceEmail({ email, name, leaseDetails: { address: propertyOwns.address, leaseId: lease._id } })
    console.log("Accept lease email sent successfully")
  }
  return lease
}

module.exports = {
  addLeaseService,
}
