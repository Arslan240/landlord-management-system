const getObjectKeyFromS3Url = (url) => {
  const parsedUrl = new URL(url)
  const path = parsedUrl.pathname // This gives us the path part of the URL, like /uploads/my-image.jpg
  return path.replace(/^\/rently-bucket\//, "").replace(/^\/+/, "")
}

export default getObjectKeyFromS3Url
