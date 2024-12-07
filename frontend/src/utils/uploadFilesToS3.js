export const uploadFilesToS3 = async (urls, files) => {
  try {
    const promisesArr = urls.map((url, index) => {
      return axios.put(url, files[index], { headers: { "Content-Type": files[index].type || "image/*" } })
    })

    let resp = await Promise.all(promisesArr)
    const data = resp.map(({ config }) => config?.url.split("?")[0])
    return data
  } catch (error) {
    toast.error(`There was an error in uploading files to s3\n ${error.message}`)
    throw error
  }
}
