import { motion } from "motion/react"
import { useState } from "react"
import axios from "axios"
import Dropzone from "../Dropzone"
import { useAddPropertyContext } from "../../pages/AddProperty"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { customFetch, getObjectKeyFromS3Url } from "../../utils"

const minImagesNo = 2
const PropertyImagesForm = ({ variants, defaultValues, custom }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([])
  const [heroImage, setHeroImage] = useState("")

  const {
    step,
    totalSteps,
    onSubmit,
    DURATION,
    handleNext,
    handlePrev,
    formState,
    toastRef,
    mediaUploaded,
    appendS3ObjectIds,
    formCompleted,
    setFormCompleted,
    setMediaUploaded,
  } = useAddPropertyContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues, mode: "onBlur" }) //triggers validation on onBlur (focus lost)

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("successfull submit")
      handleNext()
    }
  }, [isSubmitSuccessful])

  const submitHandler = () => {
    if (acceptedFiles.length < minImagesNo) {
      toast.error(`Upload at least ${minImagesNo} images`)
      return
    }
    onSubmit({ media: acceptedFiles }, step)
    setFormCompleted(true)
  }

  const getPresignedUrls = async (fileNames) => {
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

  const uploadFilesToS3 = async (urls, files) => {
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

  // TODO: bug: when media upload/getting presigned url fails, if user clicks submit again, as formCompleted is already true so this useEffect doesn't rerun. Gotta figure out this bug.
  // maybe setup a error state, for which you change its state from previous one so that the useEffect can run again. IDK maybe
  useEffect(() => {
    const uploadMedia = async () => {
      console.log("media upload called")
      if (formCompleted && !mediaUploaded) {
        const { media } = formState.step3

        if (!media || media?.length <= 0) {
          toast.error("No media files attached")
          return
        }
        try {
          // TODO: style the toast div properly.
          toastRef.current = toast.loading("Creating property")
          const files = formState.step3?.media

          // get presigned s3 urls from server
          const fileNames = media.map((file) => ({ name: file.name, fileType: file.type }))
          const preSignedUrls = await getPresignedUrls(fileNames)
          console.log("presigned urls: ", preSignedUrls)

          // upload files to s3
          const uploadedUrls = await uploadFilesToS3(preSignedUrls, files)
          const objectIds = uploadedUrls.map((url) => getObjectKeyFromS3Url(url))
          console.log("files uploaded resp", uploadedUrls)
          console.log("objectIds", objectIds)

          // append object ids to files array in step 3
          appendS3ObjectIds(objectIds)

          // set media upload completed
          setMediaUploaded(() => {
            toast.success("media uploaded reached")
            return true
          })
        } catch (error) {
          console.log("Error in uploading Files", error.message)
          // because toast is initialized inside try block we must complete it by setting isLoading false. If we just do toast.error(), a new toast will be created and loading toast will stay there.
          toast.update(toastRef.current, {
            isLoading: false,
            type: "error",
            render: `error.message`,
            autoClose: 3000,
          })
        }
      } else if (mediaUploaded) {
        toast.warning("Media is already uploaded")
      }
    }

    uploadMedia()
  }, [formCompleted])

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" transition={{ duration: DURATION }}>
      <form onSubmit={handleSubmit(() => submitHandler())}>
        <Dropzone acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} heroImage={heroImage} setHeroImage={setHeroImage} />
        <button type="submit" className="btn btn-secondary btn-sm text-white">
          Submit
        </button>
      </form>
      <div className="mx-auto pt-3 flex gap-2 place-content-end">
        <button className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50" disabled={step === 1} onClick={handlePrev}>
          Prev
        </button>
        <button type="submit" className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50" disabled={step === totalSteps}>
          Next
        </button>
      </div>
    </motion.div>
  )
}

export default PropertyImagesForm
