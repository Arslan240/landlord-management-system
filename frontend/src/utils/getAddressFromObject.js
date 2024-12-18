const getAddressFromObject = (address) => {
  return `${address.plotNo}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`
}
export default getAddressFromObject
