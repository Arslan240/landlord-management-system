import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../utils"
import Loading from "../components/Loading"
import { useLocation, useNavigation } from "react-router-dom"
import OutletPageWrapper from "../components/OutletPageWrapper"
import Carousel from "../components/Carousel"

const getIdFromPathname = (pathname) => {
  const regex = /[^/]+$/
  return pathname.match(regex)[0]
}

const getAddress = (address) => {
  return `${address.plotNo}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`
}

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
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="md:w-3/6 ">
            {/* <Carousel images={images} /> */}
            <figure>
              <Carousel slides={newImages} roundedClass={`rounded-xl`} imageHeightClass={"h-[18rem]"} spaceBetweenImages thumbs />
            </figure>
          </div>
          <div className="card shadow-xl rounded-md  p-4 gap-2 md:w-3/6 text-xs">
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
          <h1 className="text-2xl font-extrabold">Tenants</h1>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">Maintenance Requests</h1>
        </div>
      </div>
    </OutletPageWrapper>
  )
}

export default SingleProperty
