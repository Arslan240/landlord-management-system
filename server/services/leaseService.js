const { LEASE_ACCEPTED, LEASE_REJECTED, LEASE_CANCELLED } = require("../constants")
const { BadRequestError, NotFoundError, UnAuthenticateError, UnAuthorizedError } = require("../errors")
const Lease = require("../models/Lease.model")
const Property = require("../models/Property.model")
const sendLeaseAcceptanceEmail = require("../utils/sendLeaseAcceptanceEmail")

async function addLeaseService({ tenantDetails, propertyDetails, landlordId }) {
  const { propertyId, rent, deposit, startDate, endDate, terms } = propertyDetails
  const { email, tenant } = tenantDetails
  const { isOffline, name, _id: tenantId } = tenant

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
  const lease = await Lease.create({ landlordId, tenantId, propertyId, rent, deposit, startDate, endDate, terms, status })
  if (!lease) {
    throw new Error("Lease didn't create, Please try again")
  }
  console.log("Lease created successfully")
  if (!isOffline) {
    await sendLeaseAcceptanceEmail({ email, name, leaseDetails: { address: propertyOwns.address, leaseId: lease._id } })
    console.log("Accept lease email sent successfully")
  }
  return lease
}

async function updateLeaseService({ data, user }) {
  const { status, leaseId } = data
  const { id: userId } = user

  const lease = await Lease.findById(leaseId)
  if (!lease) {
    throw new NotFoundError("Lease not found")
  }

  const tenantId = lease.tenantId?.toString()
  const landlordId = lease.landlordId?.toString()

  // only landlord and tenant included in the lease can update it
  if (userId !== tenantId && userId !== landlordId) {
    throw new UnAuthorizedError("You're not authorized for this operation")
  }

  // if status is being updated to success, then only tenant can do that, similarly if changed to cancelled only landlord can do that.
  if (lease.status !== status && (status === LEASE_ACCEPTED || status === LEASE_REJECTED) && userId === landlordId) {
    throw new UnAuthorizedError("Only tenant can accept or reject the lease")
  }
  // if status is being updated to cancelled, only landlord can do that
  if (lease.status !== status && status === LEASE_CANCELLED && userId === tenantId) {
    throw new UnAuthorizedError("Only landlord can cancel the lease")
  }

  lease.status = status
  await lease.save()

  return lease
}

module.exports = {
  addLeaseService,
  updateLeaseService,
}
