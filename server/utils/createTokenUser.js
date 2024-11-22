// TODO: add isVerified and profile image of user in user as well
const createTokenUser = (user) => {
  return {
    name: user.name,
    id: user._id,
    role: user.role,
  }
}

module.exports = {
  createTokenUser,
}
