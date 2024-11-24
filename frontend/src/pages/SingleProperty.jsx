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

  let images = data.images
  console.log(images)
  let newImages = data.images.map((id) => `${cloudfront}/${id}`)

  return (
    <OutletPageWrapper title={`${data.name}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-3/6">
          {/* <Carousel images={images} /> */}
          <figure>
            <Carousel slides={newImages} roundedClass={`rounded-3xl`} spaceBetweenImages thumbs />
          </figure>
        </div>
        <div className="">
          <h2 className="text-2xl">Details</h2>
        </div>
      </div>
    </OutletPageWrapper>
  )
}

export default SingleProperty
