import { createContext, useContext, useEffect, useRef, useState } from "react"
import Search from "../components/Search"
import Filters from "../components/Filters"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { customFetch } from "../utils"
import RequireAuth from "../components/RequireAuth"
import { useDispatch, useSelector } from "react-redux"
import { setServerFilters, usePropertyState } from "../redux/propertySlice"
import Loading from "../components/Loading"
import Property from "../components/Property"

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
// PARAMS OBJECT
// we iterate over selectedFilters and look for min and max values. First if max is "", we use filter sign of '=' for that attribute
// if max is not "", we check both max and min, and then we setup >= for min and <= for max value.
// on the backend we'll also need to update our query object based on this. refer to john smilga node course. maybe in ecommerce api project.

// still not used anywhere. I thought to create filters object here and render based on this. but maybe not.
// we'll get filters for each data route from server eventually

// first of all setup react query and then we'll be able to determine at which level we need what and will react query be able to fetch data
// just setup a simple properties context here
// inside filters component setup filter config with filter handler which updates state in the context
// iterate over values in filterconfig to render single filters
// inside single filter use filter handler to update filter value.
//

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const searchRef = useRef()
  // console.log(searchRef.current && searchRef.current.value)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // redux
  const dispatch = useDispatch()
  const { selectedFilters, serverFilters } = usePropertyState()
  // react query
  const { data, isFetching, error } = useQuery({
    queryKey: ["properties", selectedFilters],
    queryFn: async () => {
      const { data } = await customFetch("properties")
      return data.data
    },
  })

  const properties = data?.properties || []

  // updating properties in redux
  useEffect(() => {
    const serverFilters = data?.filters
    if (serverFilters) {
      dispatch(setServerFilters(serverFilters))
    }
  }, [data, dispatch])

  console.log("Properties: ", properties)
  console.log("Server Filters: ", serverFilters)
  console.log("Property State: ", usePropertyState())

  return (
    <section className="pb-5">
      <h1 className="capitalize text-3xl font-semibold">properties</h1>
      {/* search and filters */}
      <div className="flex flex-col md:flex-row justify-between py-3 gap-5">
        <div>
          <Search placeholder={"Search properties"} changeHandler={handleSearch} />
        </div>
        <Filters serverFilters={serverFilters} />
      </div>
      {/* <p>hello</p> */}
      {isFetching && <Loading />}
      {/* <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit place-items-center"> */}
      {/* <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4"> */} {/** for complete auto grow do 250px,1fr */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,280px))] gap-4 justify-center">
        {!isFetching && properties && properties.map((item) => <Property key={item._id} {...item} />)}
      </section>
    </section>
  )
}
export default RequireAuth(Properties)

Properties.whyDidYouRender = true
