const { BadRequestError } = require("../errors")
const { Tenant } = require("../models/Tenant.model")
const { addTenantService } = require("../services/tenantService")

// find only those tenants which are associated to current landlord user
// also only allow this route to landlord role
const getTenants = async (req, res) => {
  const { id } = req.user

  // const tenants = await Tenant.find()
  res.send("Get All Tenants")
}

const addTenant = async (req, res) => {
  const { name, dob, occupation, idNumber, salary, imageUrl, isOffline, email } = req.body

  if (!isOffline) {
    if (!name || !email || !idNumber) {
      throw new BadRequestError("Please provide Name, Email and Govt Id number for an online tenant.")
    }
  }

  if (isOffline) {
    if (!name || !dob || !occupation || !idNumber || !email) {
      throw new BadRequestError("Please provide all the values for Name, Date of Birth, Occupation and Govt Identification")
    }
  }

  const createdBy = req.user.id //landlord id
  const tenant = await addTenantService({ isOffline, createdBy, name, email, dob, occupation, idNumber, salary, imageUrl })

  res.send({ msg: "Tenant created successfully", data: tenant })
}

module.exports = {
  getTenants,
  addTenant,
}
