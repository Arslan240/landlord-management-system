const createTokenUser = (user) => {
  return {
    user: user.name,
    id: user._id,
    role: user.role,
  }
}

module.exports = {
  createTokenUser,
}
