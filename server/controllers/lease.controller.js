const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")
const { BadRequestError, UnAuthenticateError, NotFoundError } = require("../errors")
const { User } = require("../models/User.model")
const Lease = require("../models/Lease.model")
const Property = require("../models/Property.model")
const sendLeaseAcceptanceEmail = require("../utils/sendLeaseAcceptanceEmail")
const { addTenantService } = require("../services/tenantService")
const { addLeaseService, updateLeaseService } = require("../services/leaseService")

const getLeases = async (req, res) => {
  const { id } = req.user
  const leases = await Lease.find({
    $or: [
      { tenantId: id },
      { landlordId: id }
    ]
  })

  if (!leases) {
    return res.status(StatusCodes.OK).json({ data: [], length: 0 })
  }

  console.log(leases);


  res.status(StatusCodes.OK).json({ data: { leases }, length: leases.length })
}

const getSingleLease = async (req, res) => {
  const { id } = req.params

  const lease = await Lease.findOne({ _id: id }).populate("propertyId", "address name images").populate("landlordId", "name")
  if (!lease) {
    throw new NotFoundError("Lease not found. Please contact your landlord/admin")
  }

  // I could also use mongodb aggregation, but i choose this was easy to understand and maintain, later I can convert to aggregation if needed
  const transformedLease = lease.toObject()
  transformedLease.property = transformedLease.propertyId
  transformedLease.landlord = transformedLease.landlordId
  // transformedLease.property.images = transformedLease.property.images.map((imageId) => `${process.env.CLOUDFRONT_URL}/${imageId}`)

  delete transformedLease.propertyId
  delete transformedLease.landlordId

  res.json({ lease: transformedLease })
}

const addLease = async (req, res) => {
  const { tenantDetails, propertyDetails } = req.body
  const { isOffline, name, email, idNumber, occupation, dob, salary } = tenantDetails
  const { propertyId, rent, deposit, startDate, endDate, terms } = propertyDetails

  if (!name || !idNumber) {
    throw new BadRequestError("Please provide Name, Email, and Govt Id of tenant")
  }

  if (!propertyId || !rent || !startDate) {
    throw new BadRequestError("Please provide Property, Rent and startDate for lease")
  }

  const ownerId = req.user.id

  // if online tenant, send email of lease request to user's email
  if (!isOffline) {
    await onlineTenantLeaseController({ tenantDetails, propertyDetails, userId: ownerId, res })
    return
  }

  // if tenant offline
  if (!occupation || !dob) {
    throw new BadRequestError("Please provide Occupation and Date of birth for an offline tenant.")
  }

  const tenant = await addTenantService({ ...tenantDetails, createdBy: ownerId })
  const lease = await addLeaseService({ tenantDetails: { email, tenant }, propertyDetails, landlordId: ownerId })

  // if tenant is offline and we need to call add tenant controller from here, then call add lease controller with property id and newly created tenant id
  // landlord should own the property, if not then unauthorised error, also maybe invalid the refresh token, and logout the user.
  // if already rejected / cancelled, you can't change the status

  res.status(StatusCodes.CREATED).json({ msg: "Lease added successfully", data: lease })
}

const updateLease = async (req, res) => {
  const { id } = req.params

  const lease = await updateLeaseService({ data: { leaseId: id, ...req.body }, user: req.user })

  res.status(StatusCodes.OK).json({ msg: "Lease have been updated successfully", data: lease })
}



module.exports = {
  getLeases,
  getSingleLease,
  addLease,
  updateLease,
}

// extract lease service from it, maybe online tenant lease service, offline tenant lease service
async function onlineTenantLeaseController({ propertyDetails, tenantDetails, userId, res }) {
  const { name, email, idNumber, isOffline } = tenantDetails

  if (!email) {
    throw new BadRequestError("Please provide email for online tenant.")
  }

  const tenant = await User.findOne({ email, idNumber })
  if (!tenant) {
    throw new BadRequestError(`Tenant with ${email} and Govt Id ${idNumber} doesn't exist. Please correct tenant details and submit again`)
  }

  const lease = await addLeaseService({
    tenantDetails: { email, tenant: { _id: tenant._id, ...tenantDetails } },
    propertyDetails,
    landlordId: userId,
  })
  if (!lease) {
    throw new Error("Something went wrong. Please try again.")
  }

  res
    .status(StatusCodes.CREATED)
    .json({ msg: `Lease request is sent to ${name}. Please wait patiently, you'll be notified when tenant accepts the lease.` })
}
