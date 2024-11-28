import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../utils"
import Loading from "../components/Loading"
import { Link, useLocation, useNavigation } from "react-router-dom"
import OutletPageWrapper from "../components/OutletPageWrapper"
import Carousel from "../components/Carousel"
import TableRenderer from "../components/TableRenderer"
import RequireAuth from "../components/RequireAuth"

const getIdFromPathname = (pathname) => {
  const regex = /[^/]+$/
  return pathname.match(regex)[0]
}

const getAddress = (address) => {
  return `${address.plotNo}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`
}

const tenantHeadings = ["Name", "Email", "Lease End", "Rent", "Availability"]
const tenantValues = [
  ["Joseph", "joseph@gmail.com", "12 Dec, 2029", "$299", "available"],
  ["Emily", "emily@gmail.com", "19 March, 2028", "$800", "occupied"],
  ["Abraham", "abraham@gmail.com", "23 Jan, 2030", "$340", "available"],
  ["Hailey", "hailey@gmail.com", "9 August, 2025", "$670", "occupied"],
]

const cloudfront = "https://d299qmc6osrfqv.cloudfront.net"

const SingleProperty = () => {
  const { pathname } = useLocation()
  const id = getIdFromPathname(pathname)
  const { data, isFetching } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await customFetch(`properties/${id}`)
      return data?.data
    },
  })

  if (isFetching) {
    return <Loading />
  }

  const { name, address, details, available } = data
  const { beds, baths, sqft, garage, rent, yearBuilt, furnished, petFriendly } = details
  let newImages = data.images.map((id) => `${cloudfront}/${id}`)

  return (
    <OutletPageWrapper title={`${data.name}`}>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col md:flex-row gap-2 pb-2">
          <div className="md:w-3/6 ">
            {/* <Carousel images={images} /> */}
            <figure>
              <Carousel slides={newImages} roundedClass={`rounded-xl`} imageHeightClass={"h-[18rem]"} spaceBetweenImages thumbs />
            </figure>
          </div>
          <div className="card border-2 rounded-md  p-4 gap-2 md:w-3/6 text-xs">
            {/* <h2 className="text-xl">Details</h2> */}
            {/* name */}
            {name && (
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-sm">Name</p>
                  <p>{name}</p>
                </div>
                {/* Availablity */}
                {available && (
                  <div>
                    <span className={`badge ${available ? "badge-accent" : "badge-warning"} text-white text-xs`}>
                      {available ? "available" : "occupied"}
                    </span>
                  </div>
                )}
              </div>
            )}
            {/* address */}
            {address && (
              <div>
                <p className="font-semibold text-sm">Address</p>
                <p className="">{getAddress(address)}</p>
              </div>
            )}

            {/* beds and baths */}
            <div className="flex align-start gap-2">
              {beds && (
                <div>
                  <p className="font-semibold">{beds} beds</p>
                </div>
              )}
              {baths && (
                <div>
                  <p className="font-semibold">{baths} baths</p>
                </div>
              )}
            </div>
            {/* TODO: come back and add these features */}
            {/* features */}
            {/* Lease Ending date */}
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-between md:flex-row ">
            <h1 className="text-2xl font-bold">Tenants</h1>
            <div className="flex gap-2">
              <Link to={`/dashboard/tenants/discover`}>
                <button className="btn text-white btn-secondary btn-sm">Find Tenants</button>
              </Link>
              <Link to={`/dashboard/tenants/add-tenant?prop=${id}&redirect=/dashboard/properties/${id}`}>
                <button className="btn text-white btn-secondary btn-sm">Add Tenant</button>
              </Link>
            </div>
          </div>
          <TableRenderer headings={tenantHeadings} valueRows={tenantValues} badgeIndex={tenantHeadings.length - 1} successTerm={"available"} small />
        </div>
        <div>
          <div className="flex flex-col justify-between md:flex-row ">
            {/* Add Details button where you take them to leases page and also add filters there based on status and dates. */}
            <h1 className="text-2xl font-bold">Leases</h1>
            <div className="flex gap-2">
              <Link to={`/dashboard/leases/add-lease?prop=${id}&redirect=/dashboard/properties/${id}`}>
                <button className="btn text-white btn-secondary btn-sm">Add New Lease</button>
              </Link>
            </div>
          </div>
          <TableRenderer headings={tenantHeadings} valueRows={tenantValues} small />
        </div>
        <div>
          <div className="flex flex-col justify-between md:flex-row ">
            {/* Add Details button where you take them to maintenance page and also add filters there based on status and dates. tenants' emails etc */}
            <h1 className="text-2xl font-bold">Maintenance Requests</h1>
            <div className="flex gap-2">
              <Link to={`/dashboard/leases/add-lease?prop=${id}&redirect=/dashboard/properties/${id}`}>
                {/* TODO: if tenant adds maintenance request then it would be different layout
                If landlord adds maintenance request then it would be different, condition would be if owner of property then 
                show landlord layout, otherwise tenant layout. Also first check if the tenant is renting this property, only
                then allow him to add maintenance request.
              */}
                <button className="btn text-white btn-secondary btn-sm">Add New Request</button>
              </Link>
            </div>
          </div>
          <TableRenderer headings={tenantHeadings} valueRows={tenantValues} small />
        </div>
      </div>
    </OutletPageWrapper>
  )
}

export default RequireAuth(SingleProperty)
