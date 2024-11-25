import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"
import { redirect, useNavigate, useParams, useSearchParams } from "react-router-dom"

// const propertyLoader
const validateRedirectUrl = (redirectUrl = "") => {
  const validUrls = ["/dashboard/tenants", "/dashboard/properties/"]
  return validUrls.some((path) => redirectUrl.startsWith(path))
}

const AddTenant = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const propertyId = params.get("prop")
  const redirect = params.get("redirect")
  const redirectUrl = validateRedirectUrl(redirect) ? redirect : "/dashboard/tenants"

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(redirectUrl)
  }

  return (
    <OutletPageWrapper title={"Add new tenant"}>
      <form onSubmit={onSubmit}>
        <button className="btn btn-secondary btn-sm">Submit</button>
      </form>
    </OutletPageWrapper>
  )
}

export default RequireAuth(AddTenant)
