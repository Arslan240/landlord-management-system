const { StatusCodes } = require("http-status-codes")
const { randomBytes } = require("crypto")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { BadRequestError } = require("../errors")
const { bucketName, s3Client } = require("../aws/s3")

const getPreSignedUrls = async (req, res) => {
  const { fileNames } = req.body

  if (!fileNames || fileNames?.length <= 0) {
    throw new BadRequestError("Provide at least one filename.")
  }

  const promisesArr = fileNames.map((name) => {
    const imageKey = randomBytes(16).toString("hex")

    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
      ContentType: "multipart/form-data",
    })
    return getSignedUrl(s3Client, putCommand)
  })
  const urls = await Promise.all(promisesArr)

  res.status(StatusCodes.OK).json({ urls })
}

module.exports = {
  getPreSignedUrls,
}
