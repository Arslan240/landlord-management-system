import FormWrapper from "../components/FormWrapper"
import { useSearchParams } from "react-router-dom"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"
import { AnimatePresence } from "motion/react"
import { TenantDetailsForm } from "../components/AddLeaseForm/"
import { useState } from "react"

const AddLease = () => {
  // in property dropdown, when you select a property then navigate to the page where property id
  const searchParams = useSearchParams()
  const { prop, redirect } = searchParams
  const [formState, setFormState] = useState({ tenantDetails: { isOffline: true }, propertyDetails: {} })
  return (
    <OutletPageWrapper title={"Create New Lease"}>
      <FormWrapper width="100%">
        <AnimatePresence>
          <TenantDetailsForm />
        </AnimatePresence>
      </FormWrapper>
    </OutletPageWrapper>
  )
}

export default RequireAuth(AddLease)
