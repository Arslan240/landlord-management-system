const dotenv = require("dotenv")
dotenv.config()
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { randomBytes } = require("crypto")

const region = process.env.AWS_REGION
const bucketName = "rently-bucket"

const s3_access_key = process.env.AWS_ACCESS_KEY_ID
const s3_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY

// we can just export these env variables and aws sdk can automatically reads them also
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: s3_access_key,
    secretAccessKey: s3_secret_access_key,
  },
})

module.exports = { s3Client, bucketName }

const getObjectKeyFromUrl = (url) => {
  const parsedUrl = new URL(url)
  const path = parsedUrl.pathname // This gives us the path part of the URL, like /uploads/my-image.jpg
  return path.replace(/^\/rently-bucket\//, "").replace(/^\/+/, "")
}

//   const objectKey = getObjectKeyFromUrl(presignedUrl)
//   console.log(objectKey)
//   const imageId = presignedUrl.split("?")[0].split("https://rently-bucket.s3.us-east-1.amazonaws.com/")[1]
//   console.log(imageId) //this gives us imageid
