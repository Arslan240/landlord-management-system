import { toast } from "react-toastify"
import moment from "moment"
import { Navigate, useLoaderData, useNavigate, useSearchParams } from "react-router-dom"
import { fetchLease } from "../queries/useFetchLease"
import OutletPageWrapper from "../components/OutletPageWrapper"
import { customFetch, getAddressFromObject, getErrorMessage } from "../utils"
import { useUserState } from "../redux/userSlice"
import { CLOUDFRONT } from "../constants"
import Carousel from "../components/Carousel"
import { useState } from "react"
import Btn from "../components/Btn"

export const acceptLeaseLoader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const searchParams = new URL(request.url).searchParams
      const leaseId = searchParams.get("leaseId")
      return queryClient.fetchQuery({
        queryKey: ["leases", leaseId],
        queryFn: () => fetchLease(leaseId),
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      return error
    }
  }

// TODO: in future, add an svg returned from server, it should have a vintage design of document and lease details in it, also add accept and reject buttons.
// resources: https://venngage.com/blog/lease-agreement/
const AcceptLease = () => {
  const data = useLoaderData()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusValue, setStatusValue] = useState(null)

  const [searchParams] = useSearchParams()
  const { name } = useUserState()

  const { landlord, property, startDate, endDate, rent, deposit, status } = data
  const { name: propertyName, images } = property

  const propertyImages = images.map((imageId) => `${CLOUDFRONT}/${imageId}`)

  const start = moment(startDate).format("MMMM do, YYYY")
  const end = endDate ? moment(endDate).format("MMMM do, YYYY") : null

  console.log("accept lease data: ", data)

  const address = getAddressFromObject(property.address)
  const title = propertyName || address

  const acceptLeaseHandler = async (status) => {
    try {
      setIsSubmitting(true)
      setStatusValue(status)
      const { data } = await customFetch.patch(`leases/${searchParams.get("leaseId")}`, {
        status,
      })
      const { msg, data: updatedLease } = data
      const successMessage = status === "accepted" ? "You've accepted the lease successfully" : "You've rejected the lease successfully"
      navigate("/dashboard/leases")
      toast.success(successMessage)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
      setStatusValue(null)
    }
  }

  if (status === "accepted" || status === "rejected") {
    toast.info("You've already responded to the lease request")
    return <Navigate to={"/dashboard/leases"} />
  }

  if (status === "cancelled") {
    toast.info("Landlord has withdrawn the lease request. Kindly contact the landlord for a new lease")
    return <Navigate to={"/dashboard/leases"} />
  }

  return (
    <OutletPageWrapper title={"Accept Lease"}>
      <div className="px-2 py-4">
        <h1 className="text-2xl mb-2">Lease for {title}</h1>
        <p>
          Hi, {name}. Your landlord {landlord.name} has requested you to accept this lease.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/5 ">
            <Carousel slides={propertyImages} roundedClass={`rounded-xl`} imageHeightClass={"h-[14rem] lg:h-[15rem]"} spaceBetweenImages thumbs />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-2">
            <div>
              <h2 className="mt-2 text-xl font-extrabold">Property</h2>
              <div>
                {propertyName && (
                  <p>
                    <span className="font-semibold">Name: </span>
                    <span>{propertyName}</span>
                  </p>
                )}
                <p>
                  <span className="font-semibold">Address: </span>
                  <span>{address}</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="mt-2 text-xl font-extrabold">Lease </h2>
              <p>
                <span className="font-semibold">Start: </span>
                <span>{start} </span>
              </p>
              <p>
                <span className="font-semibold">End: </span>
                <span>{end ? end : "Forseeable Future"} </span>
              </p>
            </div>
            <div>
              <h2 className="mt-2 text-xl font-extrabold">Rent </h2>
              <p>
                <span className="font-semibold">Rent: </span>
                <span>${rent} </span>
              </p>
              <p>
                <span className="font-bold">Deposit: </span>
                <span>{deposit ? `$${deposit}` : "Nill"} </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Btn
          text={"Accept"}
          clickHandler={() => acceptLeaseHandler("accepted")}
          isSubmitting={isSubmitting && statusValue === "accepted"}
          classNames="btn-success text-white rounded-full "
        >
          Accept
        </Btn>
        <Btn
          text={"Reject"}
          clickHandler={() => acceptLeaseHandler("rejected")}
          isSubmitting={isSubmitting && statusValue === "rejected"}
          classNames="btn-error text-white rounded-full"
        >
          Reject
        </Btn>
      </div>
    </OutletPageWrapper>
  )
}

export default AcceptLease
