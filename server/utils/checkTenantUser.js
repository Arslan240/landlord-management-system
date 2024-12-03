const { Tenant } = require("../models/Tenant.model")

const checkTenantUser = async (userObject, idNumber) => {
  const checkTenant = await Tenant.findOne({ idNumber })
  if (checkTenant && checkTenant.isOffline) {
    userObject["_id"] = checkTenant._id
    return userObject
  }
  return userObject
}

module.exports = {
  checkTenantUser,
}
