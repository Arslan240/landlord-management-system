import { Bath, Bed } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Carousel from "./Carousel"
import { GRIDVIEW, LISTVIEW } from "../constants"

const iconSize = "1rem"

const slides = ["https://i.ibb.co/ncrXc2V/1.png", "https://i.ibb.co/B3s7v4h/2.png", "https://i.ibb.co/XXR8kzF/3.png"]

// const Property Render
import React from "react"

// map over properties here and put table style here around list property
const PropertyRenderer = ({ viewType, properties }) => {
  if (viewType === LISTVIEW) {
    return (
      <div className="overflow-x-auto pt-2 pb-2 ">
        <table className="table-auto rounded-lg w-full text-left shadow-md">
          {/* Table Head */}
          <thead>
            <tr className="bg-primary-lightest">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Street Add</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Rent</th>
              <th className="px-6 py-3">Beds</th>
              <th className="px-6 py-3">Baths</th>
              <th className="px-6 py-3">Available</th>
              <th className="px-6 py-3">Ratings</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item, index) => (
              <ListProperty {...item} key={item._id} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <>
        {properties.map((item) => (
          <GridProperty key={item._id} {...item} />
        ))}
      </>
    )
  }
}

export default PropertyRenderer

const GridProperty = ({ details, _id, address, available, images }) => {
  const { sqft, baths, beds, rent } = details
  const { plotNo, street } = address
  const location = useLocation()

  return (
    <div className="card card-compact bg-base-100 hover:shadow-xl hover:shadow-secondary-light transition-all delay-0 shadow-secondary-lightest shadow-lg">
      {/* max-w-[17rem] */}
      {/* <figure className="sm:max-w-72 max-h-52 relative"> */}
      <figure className="max-h-52 relative">
        {/* <img
            src={images[0]}
            alt="Shoes"
          /> */}
        <Carousel>
          {slides.map((src, index) => (
            <img src={src} key={src} />
          ))}
        </Carousel>
        {available && <div className="badge ml-auto text-xs bg-green-600 text-white absolute right-3 top-4 shadow-2xl border-none">available</div>}
      </figure>
      <div className="card-body !p-3">
        {/* address and rent */}
        <div className="flex justify-between items-center mb-2">
          <p className="flex-grow-0  font-semibold">
            {plotNo} {street}
          </p>
          <p className="flex-grow-0 text-lg font-bold">$ {rent}</p>
        </div>
        {/* <h2 className="card-title">Shoes!</h2> */}
        {/* property details */}
        <div className="flex text-sm gap-5 leading-none">
          <p className="flex items-center max-w-fit">
            <span className="inline-block pr-1">{beds}</span>
            <Bed size={iconSize} className="inline-block" />
          </p>
          <p className="flex items-center max-w-fit">
            <span className="inline-block pr-1">{baths}</span>
            <Bath size={iconSize} className="inline" />
          </p>
          <p className="flex items-center max-w-fit">
            <span className="inline-block pr-1">{sqft}</span>
            <span className="font-semibold text-[.9rem]">sqft</span>
          </p>
        </div>
        <div className="flex card-actions">
          <Link to={`${location.pathname}/${_id}`} className="items-start sm:ml-auto text-secondary hover:underline">
            Details
          </Link>
        </div>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-secondary">Buy Now</button>
        </div> */}
      </div>
    </div>
  )
}

const ListProperty = ({ details, _id, address, available, images, index }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const streetAdd = `${address.plotNo} ${address.street}`

  const clickHandler = () => {
    navigate(`${location.pathname}/${_id}`)
  }

  return (
    <tr className="bg-white border-b hover:bg-primary-hoverlight cursor-pointer" onClick={clickHandler}>
      <td className="px-6 py-4">{index}</td>
      <td className="px-6 py-4">{streetAdd}</td>
      <td className="px-6 py-4">{address.city}</td>
      <td className="px-6 py-4">${details.rent}</td>
      <td className="px-6 py-4">{details.beds}</td>
      <td className="px-6 py-4">{details.baths}</td>
      <td className="px-6 py-4">
        <span className={`${available ? "bg-accent-light" : "bg-warning-light"} badge badge-ghost border-none`}>
          {available ? "Available" : "Occupied"}
        </span>
      </td>
      <td className="px-6 py-4">4.5</td>
    </tr>
  )
}
