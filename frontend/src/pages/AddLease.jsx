import { customFetch } from "../utils"
import FormWrapper from "../components/FormWrapper"
import { useSearchParams } from "react-router-dom"
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
    formState: { errors, isLoading, isSubmitSuccessful },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
  })

  const onSubmit = async (data) => {
    const { propertyId, rent, deposit, startDate, endDate, terms, isOffline, name, email, occupation, dob, idNumber, salary, imageId } = data
    console.log(acceptedFiles)

    if (isOffline) {
      // const urls = await getPresignedUrls(acceptedFiles[0]) //only 1 file for user image
      // const ids = await uploadFilesToS3(urls, [acceptedFiles[0]]) //a new array with only first image
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
    try {
      const { data: leaseData } = await customFetch.post("leases", { tenantDetails, propertyDetails })
    } catch (error) {
      toast.error(error.message)
    }
    console.log(propertyDetails)
    console.log(tenantDetails)
  }

  return (
    <OutletPageWrapper title={"Create New Lease"}>
      <FormWrapper width="100%">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <TenantDetailsForm register={register} errors={errors} acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} watch={watch} />
          <PropertyDetailsForm register={register} errors={errors} />
          <button type="submit" className="btn btn-secondary btn-md text-white mt-4">
            Create Lease
          </button>
        </form>
      </FormWrapper>
    </OutletPageWrapper>
  )
}

export default RequireAuth(AddLease)
