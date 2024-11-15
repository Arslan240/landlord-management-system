import "rc-slider/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"

import { useDispatch } from "react-redux"
import { setFilters } from "../redux/propertySlice"
import { useEffect, useRef, useState } from "react"
import TooltipSlider from "./ToolTipSlider"
import FormInput from "./FormInput"
import { debounce, rest } from "lodash"
import { toast } from "react-toastify"

// HOW IT WORKS
// we store slider values in sliderValues, and input value in entryRef.
// Then by using onChangeComplete we update manualEntry and selectedSliderValues states.
// Because based on these states we dispatch to redux. When both of these states are updated we also update type to keep
// track of which one was latest and only send that one to setFilters.

// First, we recieve min and max from Filters, we update the default state using useEffect.
// using min and max we render slider.
// sliderValues state is for just UI, onChange updates this state on every single up or down in number
// we pass these to values props which are used by tooltip to show current value for min and max on top of handle.
// we use ref for input, so that we only update redux only once using onSubmit.
// TODO: maybe in future, synchronize input and sliders, when a number entered in input make slider same to it as well. and vice versa.

// added type to see which state was updated latest, so only that value for this filter will be passed to redux store.
const MANUAL = "MANUAL"
const SLIDER = "SLIDER"

const Dropdown = ({ name, min = 0, max = 700, selected, setSelected, isReset, setIsReset }) => {
  const dispatch = useDispatch()
  const [type, setType] = useState(null)
  // text input
  const [manualEntry, setManualEntry] = useState()
  const entryRef = useRef(null)
  // slider state
  const [sliderValues, setSliderValues] = useState([min, max])
  const [selectedSliderValues, setSelectedSliderValues] = useState()
  // these are for start and end labels for slider, before I was using values from sliderValues state, which caused them to change with the values
  const marks = {
    [min]: [min],
    [max]: [max],
  }

  // initial values for slider.
  useEffect(() => {
    setSliderValues([min, max])
  }, [min, max])

  const submitHandler = (e) => {
    e.preventDefault()
    let { value } = entryRef.current
    if (isNaN(value)) {
      toast.error("Please enter numbers only")
      return
    }
    setManualEntry(Number(value))
    setType(MANUAL)
    setSelected(true)
  }

  // to properly updated tooltips
  const handleSliderChange = (sliderValues) => {
    setSliderValues(sliderValues)
  }

  // to update state only when user stops sliding, we'll use this to send upto redux for react query to refetch properties.
  const handleChangeComplete = (values) => {
    setSelectedSliderValues(values)
    setType(SLIDER)
    setSelected(true)
  }

  console.log(manualEntry, selectedSliderValues)

  // debouncedFilter function
  const debouncedFilter = debounce((name, value) => {
    console.log("debounced Filter", { name, ...value })
    dispatch(setFilters({ name, ...value }))
  }, 500)

  // we update redux state based on which type was set latest by user.
  useEffect(() => {
    if (!type) return //for initial render
    console.log(type)
    if (type === MANUAL) {
      debouncedFilter(name, { min: manualEntry })
    } else if (type === SLIDER) {
      debouncedFilter(name, { min: sliderValues[0], max: sliderValues[1] })
    }
  }, [type, manualEntry, sliderValues])

  // reset state values when filter is reset
  useEffect(() => {
    if (isReset) {
      setManualEntry(null)
      setSliderValues([min, max])
      setType(null)
      setSelected(false)
      entryRef.current.value = null
      setIsReset(false)
    }
  }, [isReset])

  return (
    <ul tabIndex={0} id="dropdown" className=" menu dropdown-content rounded-md z-[1] w-52 p-1.5 shadow bg-primary-lightest">
      <div></div>
      <form className="px-1" onSubmit={submitHandler}>
        <FormInput dropdown placeholder={"Enter value"} ref={entryRef} />
      </form>
      <div className="px-5 pb-7">
        <TooltipSlider
          value={sliderValues}
          range
          min={min}
          max={max}
          marks={marks}
          defaultValue={sliderValues}
          tipFormatter={(value) => `${value}`}
          onChange={handleSliderChange}
          onChangeComplete={handleChangeComplete}
          styles={{ track: { backgroundColor: "#7566ff" }, handle: { borderColor: "#7566ff", boxShadow: "#7566ff" } }}
        />
      </div>
    </ul>
  )
}
export default Dropdown

// simple implementation
{
  /* <Slider
         value={sliderValues}
          range
          min={min}
          max={max}
          marks={marks}
          defaultValue={sliderValues}
          onChange={handleSliderChange}
          onChangeComplete={handleChangeComplete}
          styles={{ track: { backgroundColor: "#7566ff" }, handle: { borderColor: "#7566ff", boxShadow: "#7566ff" } }}
        /> */
}
