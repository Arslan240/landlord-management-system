const { BadRequestError } = require("../errors")

const { Tenant } = require("../models/Tenant.model")

async function addTenantService({ isOffline, createdBy, name, email, dob, occupation, idNumber, salary, imageId, userId }) {
  let tenantObject = {}

  // for offline user, createdBy can't be null
  if (isOffline) {
    tenantObject["createdBy"] = createdBy
  }

  //   for online user it's id must be the already registered user id
  if (!isOffline) {
    if (!userId) {
      throw new BadRequestError("Provide tenantId for online tenant.")
    }
    tenantObject["_id"] = userId
  }
  console.log(userId)
  // for online tenant, another controller will update with tenant id in this lease after tenant accepts the lease.
  tenantObject = {
    ...tenantObject,
    isOffline,
    name,
    email,
    dob,
    occupation,
    idNumber,
    salary,
    imageId,
  }

  const tenant = await Tenant.create(tenantObject)
  return tenant
}

module.exports = {
  addTenantService,
}
