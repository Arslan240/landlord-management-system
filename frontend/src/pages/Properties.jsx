import { createContext, useContext, useEffect, useRef, useState } from "react"
import Search from "../components/Search"
import Filters from "../components/Filters"
import { useQuery } from "@tanstack/react-query"
import { customFetch } from "../utils"
import RequireAuth from "../components/RequireAuth"
import { useDispatch, useSelector } from "react-redux"
import { setProperties, usePropertyState } from "../redux/propertySlice"
import Loading from "../components/Loading"
import Property from "../components/Property"

const PropertiesContext = createContext()

// still not used anywhere. I thought to create filters object here and render based on this. but maybe not.
// we'll get filters for each data route from server eventually
const filterConfig = [{
  name: 'price',
  icon: '$'
}, {
  name: 'sqft',
  icon: 'm2'
}]

// first of all setup react query and then we'll be able to determine at which level we need what and will react query be able to fetch data
// just setup a simple properties context here
// inside filters component setup filter config with filter handler which updates state in the context
// iterate over values in filterconfig to render single filters
// inside single filter use filter handler to update filter value.
// 

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const searchRef = useRef()
  console.log(searchRef.current && searchRef.current.value);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // redux
  const dispatch = useDispatch()
  const { properties, filters } = usePropertyState()
  // react query
  const { data, isFetching, error } = useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const { data } = await customFetch('properties')
      return data.data
    }
  })

  // updating properties in redux
  useEffect(() => {
    if (data) {
      dispatch(setProperties(data))
    }
  }, [data, dispatch])

  console.log('Properties: ', properties);
  console.log(filters);


  return (
    <PropertiesContext.Provider value={{ setSearchTerm, filterConfig }}>
      <section className="pb-5">
        <h1 className="capitalize text-3xl font-semibold">properties</h1>
        {/* search and filters */}
        <div className="flex flex-col md:flex-row justify-between py-3">
          <div>
            <Search placeholder={'Search properties'} changeHandler={handleSearch} ref={searchRef} />
          </div>
          <Filters />
        </div>
        {/* <p>hello</p> */}
        {isFetching && <Loading />}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!isFetching && properties && properties.map(item => <Property key={item._id} {...item} />)}
        </section>
      </section>
    </PropertiesContext.Provider>
  )
}
export default RequireAuth(Properties)

export const usePropertiesContext = () => useContext(PropertiesContext)