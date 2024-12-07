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

  const onSubmit = (data) => {
    const { propertyId, rent, deposit, startDate, endDate, terms, name, email, occupation, dob, idNumber, salary, imageUrl } = data
    console.log(acceptedFiles)
    const propertyDetails = {
      propertyId,
      rent,
      deposit,
      startDate,
      endDate,
      terms,
    }
    const tenantDetails = {
      name,
      email,
      occupation,
      dob,
      idNumber,
      salary,
      imageUrl,
    }
    console.log(data)
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
