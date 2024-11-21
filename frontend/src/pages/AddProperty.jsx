import React, { createContext, useCallback, useContext, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import { PropertyAddressForm, PropertyDetailsForm, PropertyImagesForm } from "../components/AddPropertyForm"

// label, type, placeholder, disabled, rightLabel, dropdown
const totalSteps = 3
const DURATION = 0.3
const FORWARD = 1
const BACKWARD = -1

const stepOneVariants = {
  hidden: { opacity: 0, x: -100 }, // Entry state
  visible: { opacity: 1, x: 0 }, // Active state
  exit: { opacity: 0, x: -100 }, // Exit state
}
const lastStepVariants = {
  hidden: { opacity: 0, x: 100 }, // Entry state
  visible: { opacity: 1, x: 0 }, // Active state
  exit: { opacity: 0, x: 100 }, // Exit state
}

// TODO: the animation direction of forms doesn't work properly
const stepVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
  }),
}

const AddPropertyContext = createContext()

const AddProperty = () => {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(FORWARD) // 1 for forward, -1 for backward
  const [formState, setFormState] = useState({
    step1: {},
    step2: {},
    step3: {},
  })

  console.log("formState", formState)

  const onSubmit = (data, step) => {
    console.log("step", step)
    console.log("on submit called")
    setFormState((prevState) => ({ ...prevState, [`step${step}`]: data }))
  }

  const handleNext = () => {
    console.log("handleNext called")
    if (step < totalSteps) {
      setStep((prevState) => prevState + 1)
      setDirection(FORWARD)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep((prevState) => prevState - 1)
      setDirection(BACKWARD)
    }
  }

  return (
    <AddPropertyContext.Provider value={{ DURATION, formState, step, totalSteps, onSubmit, handleNext, handlePrev }}>
      <OutletPageWrapper title="Add a new Property">
        <div className="max-w-[400px] mx-auto">
          <div className="bg-primary-lightest px-7 py-7 rounded-lg">
            <AnimatePresence mode="wait">
              {step === 1 && <PropertyAddressForm key={"step-1"} variants={stepOneVariants} defaultValues={formState.step1} />}
              {step === 2 && <PropertyDetailsForm key={"step-2"} custom={direction} variants={stepVariants} defaultValues={formState.step2} />}
              {step === totalSteps && <PropertyImagesForm key={"step-4"} variants={lastStepVariants} defaultValues={formState.step3} />}
            </AnimatePresence>
            {/* <div className="mx-auto pt-3 flex gap-2 place-content-end">
              <button
                className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50"
                disabled={step === 1}
                onClick={handlePrev}
              >
                Prev
              </button>
              <button
                className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50"
                disabled={step === totalSteps}
                onClick={handleNext}
              >
                Next
              </button>
            </div> */}
          </div>
        </div>
      </OutletPageWrapper>
    </AddPropertyContext.Provider>
  )
}

export default AddProperty

export const useAddPropertyContext = () => useContext(AddPropertyContext)
