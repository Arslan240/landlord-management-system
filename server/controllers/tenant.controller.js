const getTenants = (req, res) => {
  res.send("Get All Tenants")
}

const addTenant = (req, res) => {
  res.send("Add new tenant")
}

module.exports = {
  getTenants,
  addTenant,
}
