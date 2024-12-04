const { BadRequestError } = require("../errors")
const { Tenant } = require("../models/Tenant.model")

// find only those tenants which are associated to current landlord user
// also only allow this route to landlord role
const getTenants = async (req, res) => {
  const { id } = req.user

  // const tenants = await Tenant.find()
  res.send("Get All Tenants")
}

const addTenant = async (req, res) => {
  const { name, dob, occupation, idNumber, salary, imageUrl, isOffline } = req.body

  const createdBy = req.user.id //landlord id
  let tenantObject = {}

  // for offline user, createdBy can't be null
  if (isOffline) {
    if (!createdBy) {
      throw new BadRequestError("For an offline tenant, please specify the creator.")
    }

    tenantObject["createdBy"] = createdBy
  }

  // for registered tenant, his id is necessary.
  const user = null // when registered tenant accepts the lease then this will be populated maybe through the request made from that controller of accept lease
  if (!isOffline) {
    if (!user) {
      throw new BadRequestError("For a registered tenant, please provide tenant id")
    }

    tenantObject["user"] = user
  }

  if (!name || !dob || !occupation || !idNumber) {
    throw new BadRequestError("Please provide all the values for Name, Date of Birth, Occupation and Govt Identification")
  }

  tenantObject = {
    ...tenantObject,
    name,
    dob,
    occupation,
    idNumber,
    salary,
    imageUrl,
  }

  const tenant = await Tenant.create(tenantObject)

  res.send({ msg: "Tenant created successfully", data: tenant })
}

module.exports = {
  getTenants,
  addTenant,
}
