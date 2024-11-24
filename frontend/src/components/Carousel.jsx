import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"

const Carousel = ({ children, slides, autoslide, autoSlideInterval = 2000, roundedClass, spaceBetweenImages, imageHeightClass, thumbs }) => {
  const [curr, setCurr] = useState(0)

  const prev = () => setCurr((prevCurr) => (prevCurr - 1 + slides.length) % slides.length)

  const next = () => setCurr((prevCurr) => (prevCurr + 1) % slides.length)

  const handleDots = (id) => {
    setCurr(id)
  }

  useEffect(() => {
    if (!autoslide) return
    // if want the autoslider to work correctly, use prevState method in setter to access latest state in next and prev.
    const interval = setInterval(() => {
      next()
    }, autoSlideInterval)
    return () => clearInterval(interval)
  }, [])

  // TODO: implement a carousel library so that thumbnails can be used properly.
  // in current configuration it's not possible.
  return (
    <div className="relative h-full group">
      <div className="overflow-hidden relative w-full h-full ">
        <div className={`flex transition-transform duration-500`} style={{ transform: `translateX(-${curr * 100}%)` }}>
          {slides.map((item, index) => (
            <div className={`w-full flex-shrink-0 ${spaceBetweenImages ? "p-2" : ""}`}>
              <div key={index} className={`overflow-hidden ${roundedClass ? roundedClass : ""}`}>
                <img src={item} alt={`Slide ${index}`} className={`w-full ${imageHeightClass ? imageHeightClass : "h-[20rem]"} object-cover`} />
              </div>
            </div>
          ))}
        </div>
        {/* Arrows */}
        <div className="absolute inset-0  items-center justify-between p-4 hidden group-hover:flex">
          <button onClick={prev} className="p-1 w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-50 rounded-full">
            <ChevronLeft />
          </button>
          <button onClick={next} className="p-1 w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-50 rounded-full">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className={`absolute ${spaceBetweenImages ? "bottom-6" : "bottom-3"} right-0 left-0`}>
        <div className="flex gap-2 items-center justify-center">
          {slides.map((_, id) => (
            <div
              className={`transition-all w-2 h-2 rounded-full bg-slate-100 cursor-pointer ${curr === id ? "p-1" : "bg-opacity-50"}`}
              key={id}
              id="dots"
              onClick={() => handleDots(id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Carousel
