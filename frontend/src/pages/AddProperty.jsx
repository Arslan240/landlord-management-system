import React, { createContext, useCallback, useContext, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { AnimatePresence, motion } from "motion/react"
import OutletPageWrapper from "../components/OutletPageWrapper"
import { PropertyAddressForm, PropertyDetailsForm, PropertyImagesForm } from "../components/AddPropertyForm"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { capitalize, customFetch } from "../utils"
import { useRef } from "react"
import RequireAuth from "../components/RequireAuth"

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

const createProperty = async (property) => {
  try {
    const { data } = await customFetch.post("properties", property)
    return data?.property
  } catch (error) {
    throw error
  }
}

const AddPropertyContext = createContext()

const AddProperty = () => {
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get("redirect")
  const navigate = useNavigate()
  const toastRef = useRef(null)
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(FORWARD) // 1 for forward, -1 for backward
  const [formCompleted, setFormCompleted] = useState(false)
  const [mediaUploaded, setMediaUploaded] = useState(false)
  const [formState, setFormState] = useState({
    step1: {},
    step2: {},
    step3: {},
  })

  console.log("formState", formState)
  console.log("form completion", formCompleted)
  console.log("Media uploaded", mediaUploaded)

  const onSubmit = (data, step) => {
    console.log(data)
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

  const appendS3ObjectIds = (objectIds) => {
    if (formCompleted) {
      setFormState((prevState) => {
        return {
          ...prevState,
          step3: {
            ...prevState.step3,
            media: prevState.step3.media.map((file, index) => ({
              ...file,
              objectId: objectIds[index],
            })),
          },
        }
      })
    }
  }

  useEffect(() => {
    const handleCreateProperty = async () => {
      if (mediaUploaded) {
        const { name, ...restAddress } = formState.step1
        const address = {
          ...restAddress,
        }

        const { beds, baths, garage, rent, sqft, yearBuilt, available, category, ...rest } = formState.step2
        const details = {
          ...rest,
          beds: Number(beds),
          baths: Number(baths),
          garage: Number(garage),
          rent: Number(rent),
          sqft: Number(sqft),
          yearBuilt: Number(yearBuilt),
        }

        const { media } = formState.step3
        const images = media.map((file) => file.objectId)

        const property = {
          name,
          address,
          available,
          category: capitalize(category),
          details,
          images,
        }
        console.log(property)
        const createdProperty = await createProperty(property)

        if (!createdProperty) {
          toast.update(toastRef.current, {
            render: "There was an error in creating property.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          })
          // toast.error("There was an error in creating property.")
          return
        }

        const { _id } = createdProperty
        toast.update(toastRef.current, {
          render: "Property created Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
        // TODO: Test it properly by coming from add-lease page, add property and see if it redirects to the add-lease page, on the add-lease page it should populate the correct propertyId in select input.
        if (redirect) {
          if (redirect.endsWith("/add-lease")) {
            navigate(`${redirect}?prop=${_id}`)
            return
          }
        }
        // toast.success("Property created Successfully")
        navigate(`/dashboard/properties/${_id}`)
      }
    }
    handleCreateProperty()
  }, [mediaUploaded])

  return (
    <AddPropertyContext.Provider
      value={{
        toastRef,
        DURATION,
        formState,
        step,
        totalSteps,
        onSubmit,
        handleNext,
        handlePrev,
        formCompleted,
        mediaUploaded,
        appendS3ObjectIds,
        setFormCompleted,
        setMediaUploaded,
      }}
    >
      <OutletPageWrapper title="Add a new Property">
        <div className="max-w-[400px] mx-auto">
          <div className="bg-primary-lightest px-7 py-7 rounded-lg">
            <AnimatePresence mode="wait">
              {step === 1 && <PropertyAddressForm key={"step-1"} variants={stepOneVariants} defaultValues={formState.step1} />}
              {step === 2 && <PropertyDetailsForm key={"step-2"} custom={direction} variants={stepVariants} defaultValues={formState.step2} />}
              {step === totalSteps && <PropertyImagesForm key={"step-4"} variants={lastStepVariants} defaultValues={formState.step3} />}
            </AnimatePresence>
          </div>
        </div>
      </OutletPageWrapper>
    </AddPropertyContext.Provider>
  )
}

export default RequireAuth(AddProperty)

export const useAddPropertyContext = () => useContext(AddPropertyContext)
