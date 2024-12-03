const getLeases = async (req, res) => {
  res.send("Get Leases")
}
const addLease = async (req, res) => {
  res.send({ msg: "Add new Lease", body: req.body })
}

module.exports = {
  getLeases,
  addLease,
}
