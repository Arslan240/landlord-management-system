import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import FormInput, { CheckBoxInput, SelectInput } from "../components/FormInput"
import { Bath, Bed, CarFront, Dog, LampDesk, Square } from "lucide-react"

// label, type, placeholder, disabled, rightLabel, dropdown
const totalSteps = 2

const stepOneVariants = {
  hidden: { opacity: 0, x: -100 }, // Entry state
  visible: { opacity: 1, x: 0 }, // Active state
  exit: { opacity: 0, x: -100 }, // Exit state
}
const stepTwoVariants = {
  hidden: { opacity: 0, x: 100 }, // Entry state
  visible: { opacity: 1, x: 0 }, // Active state
  exit: { opacity: 0, x: 100 }, // Exit state
}

const AddProperty = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep((prevState) => (prevState < totalSteps ? prevState + 1 : prevState))
  }

  const handlePrev = () => {
    setStep((prevState) => (prevState > 1 ? prevState - 1 : prevState))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <OutletPageWrapper title="Add a new Property">
      <div className="max-w-[400px] mx-auto">
        <form className="bg-primary-lightest px-7 py-7 rounded-lg" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && <StepOneForm key={"step-1"} />}
            {step === 2 && <StepTwoForm key={"step-2"} />}
          </AnimatePresence>
          <div className="mx-auto pt-3 flex gap-2 place-content-end">
            <button className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50" disabled={step === 1} onClick={handlePrev}>
              Prev
            </button>
            <button
              className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50"
              disabled={step === totalSteps}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </OutletPageWrapper>
  )
}

export default AddProperty

const StepOneForm = () => {
  return (
    <motion.div variants={stepOneVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
      <FormInput name={"name"} label={"Name of building"} placeholder={"Name"} small={true} />
      <FormInput name={"plotNo"} label={"Address of unit / home / building"} placeholder={"Plot no"} small={true} />
      <FormInput name={"street"} placeholder={"Street Address"} small={true} />
      <div className="flex gap-2 h-full ">
        <FormInput name={"city"} placeholder={"City"} flexChild={true} small={true} />
        <FormInput name={"state"} placeholder={"State"} flexChild={true} small={true} />
      </div>
      <div className="flex gap-2 h-full ">
        <FormInput name={"postalCode"} placeholder={"Postal Code"} small={true} />
        <FormInput name={"country"} placeholder={"Country"} small={true} />
      </div>
    </motion.div>
  )
}
const StepTwoForm = () => {
  return (
    <motion.div variants={stepTwoVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
      <SelectInput label="Category of Property" options={["Apartment", "Single Family House", "Townhouse", "Condo"]} selected={0} small />
      <div className="flex gap-2">
        <FormInput name={"beds"} label="Beds" placeholder={"No. of beds"} flexChild={true} small labelIcon={<Bed size={"1rem"} />} />
        <FormInput name={"baths"} label="Baths" placeholder={"No. of baths"} flexChild={true} small labelIcon={<Bath size={"1rem"} />} />
      </div>
      <div className="flex gap-2">
        <FormInput name={"sqft"} label="Sqft" placeholder={"Sqft"} small={true} labelIcon={<div>⏍</div>} />
        <FormInput name={"garage"} label="Garages" placeholder={"No. of garages"} small labelIcon={<CarFront size={"1rem"} />} />
      </div>
      <FormInput name={"yearBuilt"} label="Built in (Year)" type={"text"} small placeholder={"19XX"} flexChild />
      <CheckBoxInput name={"available"} label={"Is the property available?"} defaultChecked />
      <CheckBoxInput name={"furnished"} label={"Is the property Furnished?"} labelIcon={<LampDesk size={"1rem"} />} />
      <CheckBoxInput name={"furnished"} label={"Is the property pet friendly?"} labelIcon={<Dog size={"1rem"} />} />
      <div>
        <button className="submit btn btn-secondary btn-sm">Submit</button>
      </div>
    </motion.div>
  )
}

const StepThreeForm = () => {}
