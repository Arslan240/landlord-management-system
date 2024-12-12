const getErrorMessage = (error) => {
  if (!error) {
    console.log("please provide error object")
    return
  }
  const { response } = error
  const errorMessage = response?.data?.msg || error.message || "Something went wrong, Please try again"
  return errorMessage
}

export default getErrorMessage
