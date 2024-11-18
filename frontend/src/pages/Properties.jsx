import { createContext, useContext, useEffect, useRef, useState } from "react"
import Search from "../components/Search"
import Filters from "../components/Filters"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createUrlParams, customFetch } from "../utils"
import RequireAuth from "../components/RequireAuth"
import { useDispatch, useSelector } from "react-redux"
import { setServerFilters, usePropertyState, resetFilters, setSearchTerm, setPage } from "../redux/propertySlice"
import Loading from "../components/Loading"
import Property from "../components/PropertyRenderer"
import { times } from "lodash"
import { LayoutGrid, List, Plus } from "lucide-react"
import { Link, useLocation, useOutletContext } from "react-router-dom"
import { GRIDVIEW, LISTVIEW } from "../constants"
import PropertyRenderer from "../components/PropertyRenderer"
import PaginationContainer from "../components/PaginationContainer"
import OutletPageWrapper from "../components/OutletPageWrapper"

// update these comments to explain actual functionality of how states and filters are being managed.
// first we'll have only serverFilters and selectedFilters in propertySlice.
// serverFilters will have an initialState with all the filters so that we don't get those empty box where name is not available when the states are fetched. Maybe it'll not happen this time because selectedFilters will have localState which will then be persisted to redux.
// selectedFilters be empty at first.
// properties page renders, inside useQuery we set key to be queryKey: ['properties',selectedFilters], and also we create a params object from selectedFilters object which we send as params in the request.
// from data we get serverFilters and we setup serverFilters.
// inside Filters, we render filters based on serverFilters.
// inside Filters we'll create maybe localstate to save the values and when applyfilters is clicked, we pertain this to reducer in selectedFilters.
// when selectedFilters change, new properties are rendered and selectedFilters are used as key
// we receive serverFilters, that we maybe should pertain to reducer.
// we keep properties in queryClient store, because they are already stored in react query store, no point in storing them in redux as well.
// when we need properties data we'll just use the stored properties.
// in selectedFilters, there will be min and max values because we'll have a slider and an input for specific value.
// if value is written in input area, then we set min to that value and max to "".
// if value is selected using slider, we override min and max both with new values.
// now our selectedFilters have lets say adequate values. Now we got to params object creation from filters.

const iconSize = "1.3rem"
const strokeWidth = "1.75"

const Properties = () => {
  const location = useLocation()
  const [isSmall, setIsSmall] = useState(false)
  const [pagination, setPagination] = useState(null)
  const searchRef = useRef()

  //
  const [view, setView] = useState(LISTVIEW)

  const searchHandler = (e) => {
    e.preventDefault()
    dispatch(setSearchTerm(searchRef.current.value))
  }

  // redux
  const dispatch = useDispatch()
  const { selectedFilters, serverFilters, searchTerm, page } = usePropertyState()
  // react query
  const { data, isFetching, error } = useQuery({
    queryKey: ["properties", searchTerm, selectedFilters, page],
    queryFn: async () => {
      let urlParams = createUrlParams(selectedFilters, searchTerm, page)
      const { data } = await customFetch(`properties?${urlParams}`)
      return data
    },
  })

  const properties = data?.data?.properties || []

  // updating properties in redux
  useEffect(() => {
    const serverFilters = data?.data?.filters
    const pagination = data?.meta?.pagination
    if (serverFilters) {
      dispatch(setServerFilters(serverFilters))
    }
    if (pagination) {
      setPagination(pagination)
    }
  }, [data, dispatch])

  // useEffect to track if it's greater than 640 or not similar to sm:
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth >= 640
      setIsSmall(isSmall)
    }
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  console.log("Properties: ", properties)
  console.log("Server Filters: ", serverFilters)
  console.log("Property State: ", usePropertyState())

  return (
    <OutletPageWrapper showTitle={false}>
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-3xl font-semibold">properties</h1>
        {/* Grid and List view Icons */}
        <div className="flex gap-1 text-primary items-center">
          <div className="flex group relative my-auto">
            <Link to={`${location.pathname}/add-property`}>
              <button className="btn btn-sm text-sm btn-secondary capitalize text-white mx-3 grow-0">
                {isSmall ? "add property" : <Plus size={iconSize} strokeWidth={"4"} />}
                {/* <Plus size={iconSize} strokeWidth={"3"} /> */}
              </button>
            </Link>
            {/* tooltip for + button */}
            {/* <div
              className={`
                absolute left-14 bottom-full rounded-md z-30 px-2 py-1 ml-6
                bg-indigo-100 text-secondary-bright text-sm
                invisible opacity-20 -translate-y-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
              `}
            >
              Add Property
            </div> */}
          </div>
          <div
            className={`${
              view === LISTVIEW && "bg-secondary-lightest text-secondary-bright"
            } p-2 cursor-pointer hover:bg-secondary-lightest hover:text-secondary-bright rounded-md`}
            onClick={() => setView(LISTVIEW)}
          >
            <List strokeWidth={strokeWidth} size={iconSize} className="cursor-pointer" />
          </div>
          <div
            className={`${
              view === GRIDVIEW && "bg-secondary-lightest text-secondary-bright"
            } p-2 cursor-pointer hover:bg-secondary-lightest hover:text-secondary-bright rounded-md`}
            onClick={() => setView(GRIDVIEW)}
          >
            <LayoutGrid strokeWidth={strokeWidth} size={iconSize} className="cursor-pointer" />
          </div>
        </div>
      </div>
      {/* search and filters */}
      <div className="flex flex-col lg:flex-row justify-between py-3 gap-5">
        <form onSubmit={searchHandler}>
          <Search placeholder={"Search properties"} ref={searchRef} />
        </form>
        <Filters serverFilters={serverFilters} resetFilters={resetFilters} />
      </div>
      {isFetching && <Loading />}
      {/* <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit place-items-center"> */}
      {/* <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4"> */} {/** for complete auto grow do 250px,1fr */}
      {/* properties section */}
      <section className={`${view === GRIDVIEW ? "grid grid-cols-[repeat(auto-fit,minmax(200px,280px))] gap-4 justify-center" : ""} mb-5`}>
        {!isFetching && properties?.length > 0 ? (
          <PropertyRenderer properties={properties} viewType={view} />
        ) : (
          !isFetching && <h1 className="text-2xl mt-16">No properties available</h1>
        )}
      </section>
      <PaginationContainer isFetching={isFetching} pageAction={setPage} pagination={pagination} properties={properties} />
    </OutletPageWrapper>
  )
}
export default RequireAuth(Properties)

Properties.whyDidYouRender = true
