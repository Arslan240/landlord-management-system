import React from "react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import RequireAuth from "../components/RequireAuth"
import { redirect, useLoaderData, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { customFetch } from "../utils"
import { toast } from "react-toastify"

// const propertyLoader
const validateRedirectUrl = (redirectUrl = "") => {
  const validUrls = ["/dashboard/tenants", "/dashboard/properties/"]
  return validUrls.some((path) => redirectUrl.startsWith(path))
}

// loader for property. just for fun not much necessity of it
export const addTenantPropertyLoader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url)
    const propertyId = url.searchParams.get("prop")

    const fetchUrl = "properties"

    return queryClient.fetchQuery({
      queryKey: ["properties"],
      queryFn: async () => {
        const { data } = await customFetch.get(fetchUrl)
        return data || {}
      },
    })
  }

// TODO: if no property id is provied then we'll give the user option to select from a list of properties. And we'll fetch all properties available in function.
// Even if user provides propertyId, we only use it to already select that property in the form from all the property options.
// At simple request, we'll only get 10 properties, but we'll have more, then maybe add a search input, also do infinite scroll maybe.
// if properties empty array, then for form select just show in disabled option - no properties available
// if no properties then show can't add tenants without any properties.
const AddTenant = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const propertyId = params.get("prop")
  const redirect = params.get("redirect")
  const redirectUrl = validateRedirectUrl(redirect) ? redirect : "/dashboard/tenants"

  const data = useLoaderData()
  const properties = data?.data?.properties || []

  console.log("properties in add tenant", properties)
  if (properties.length <= 0) {
    toast.error("No properties available")
  }

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
