import { customFetch } from "../utils"
import FormWrapper from "../components/FormWrapper"
import { useNavigate, useSearchParams } from "react-router-dom"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"
import { AnimatePresence } from "motion/react"
import { TenantDetailsForm } from "../components/AddLeaseForm/"
import { createContext, useState } from "react"
import { toast } from "react-toastify"
import PropertyDetailsForm from "../components/AddLeaseForm/PropertyDetailsForm"
import { useForm } from "react-hook-form"
import { getPresignedUrls } from "../utils/getPresignedUrls"
import { uploadFilesToS3 } from "../utils/uploadFilesToS3"
import SubmitBtn from "../components/SubmitBtn"

export const addLeaseLoader =
  (queryClient) =>
  async ({ request }) => {
    try {
      return queryClient.fetchQuery({
        queryKey: ["properties", "lookup"],
        queryFn: async () => {
          const { data } = await customFetch("properties/lookup")
          return data.data
        },
      })
    } catch (error) {
      toast.error(error.message)
      return error
    }
  }

const AddLease = () => {
  // in property dropdown, when you select a property then navigate to the page where property id
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const prop = searchParams.get("prop")
  const redirect = searchParams.get("redirect")
  const [formState, setFormState] = useState({ tenantDetails: { isOffline: true }, propertyDetails: {} })

  const [acceptedFiles, setAcceptedFiles] = useState([])
  let defaultValues = { isOffline: true }
  if (prop) {
    defaultValues["propertyId"] = prop
  }

  const {
    register,
    formState: { errors, isLoading, isSubmitSuccessful, isSubmitting },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
  })

  const onSubmit = async (data) => {
    const { propertyId, rent, deposit, startDate, endDate, terms, isOffline, name, email, occupation, dob, idNumber, salary } = data
    let imageId
    console.log(acceptedFiles)

    try {
      if (isOffline && acceptedFiles.length > 0) {
        const formattedFiles = acceptedFiles.map(({ name, type }) => ({
          name,
          fileType: type,
        }))
        const urls = await getPresignedUrls(formattedFiles) //only 1 file for user image
        const ids = await uploadFilesToS3(urls, [acceptedFiles[0]]) //a new array with only first image
        imageId = ids[0]
      }

      let propertyDetails = {
        propertyId,
        rent,
        deposit,
        startDate,
        endDate,
        terms,
      }
      const tenantDetails = {
        isOffline,
        name,
        email,
        occupation,
        dob,
        idNumber,
        salary,
        imageId,
      }
      const { data: leaseData } = await customFetch.post("leases", { tenantDetails, propertyDetails })
      const { data, msg } = leaseData
      toast.success(msg)
      if (isOffline && data) {
        const { _id: leaseId } = data
        navigate(`/dashboard/leases/${leaseId}`)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <OutletPageWrapper title={"Create New Lease"}>
      <FormWrapper width="100%">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <TenantDetailsForm register={register} errors={errors} acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} watch={watch} />
          <PropertyDetailsForm register={register} errors={errors} />
          <SubmitBtn text={"Create Lease"} classNames={"btn-md"} formSubmitting={isSubmitting} />
        </form>
      </FormWrapper>
    </OutletPageWrapper>
  )
}

export default RequireAuth(AddLease)
