export const getPresignedUrls = async (fileNames) => {
  try {
    const { data } = await customFetch.post("upload/getsignedurls", {
      fileNames,
    })
    return data?.urls
  } catch (error) {
    console.log(error.message)
    toast.error("Error in getting presigned urls.")
    throw error
  }
}
