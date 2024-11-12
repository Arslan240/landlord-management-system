import { Bath, Bed } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import Carousel from "./Carousel"

const iconSize = '1rem'

const slides = [
  'https://i.ibb.co/ncrXc2V/1.png',
  'https://i.ibb.co/B3s7v4h/2.png',
  'https://i.ibb.co/XXR8kzF/3.png',
]

const Property = ({ details, _id, address, available, images }) => {
  const { sqft, bathrooms, bedrooms, rent } = details
  const { plotNo, street } = address
  const location = useLocation()
  return (
    // <Link to={`${location.pathname}/${_id}`}>
    <div className="card card-compact bg-base-100 hover:shadow-xl hover:shadow-secondary-light transition-all delay-0 shadow-secondary-lightest shadow-lg max-w-[20rem]">
      <figure className="sm:max-w-72 max-h-52 relative">
        {/* <img
            src={images[0]}
            alt="Shoes"
          /> */}
        <Carousel >
          {slides.map((src, index) => <img src={src} />)}
        </Carousel>
        {available && <div className="badge ml-auto text-xs bg-green-600 text-white absolute right-3 top-4 shadow-2xl border-none">available</div>}
      </figure>
      <div className="card-body !p-3">
        {/* address and rent */}
        <div className="flex justify-between items-center mb-2">
          <p className="flex-grow-0  font-semibold">{plotNo} {street}</p>
          <p className="flex-grow-0 text-lg font-bold">$ {rent}</p>
        </div>
        {/* <h2 className="card-title">Shoes!</h2> */}
        {/* property details */}
        <div className="flex text-sm gap-5 leading-none">
          <p className="flex items-center max-w-fit">
            <span className="inline-block pr-1">{bedrooms}</span>
            <Bed size={iconSize} className="inline-block" />
          </p>
          <p className="flex items-center max-w-fit">
            <span className="inline-block pr-1">{bathrooms}</span>
            <Bath size={iconSize} className="inline" />
          </p>
          <p className="flex items-center max-w-fit">
            <span className="inline-block pr-1">{sqft}</span>
            <p className="font-semibold text-[.9rem]">sqft</p>
          </p>
        </div>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-secondary">Buy Now</button>
        </div> */}
      </div>
    </div>
    // </Link>

  )
}

export default Property



