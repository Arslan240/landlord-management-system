import { motion } from "motion/react"
import { useLoaderData } from "react-router-dom"
import { useForm } from "react-hook-form"
import FormInput from "../FormInput"
import CheckBoxInput from "../CheckBoxInput"
import Dropzone from "../Dropzone"
import { toast } from "react-toastify"
import { useState } from "react"
import { validateDate } from "../../utils/validateDate"
import FormTextArea from "../FormTextArea"

// for time being we don't need multi steps in the form so we'll start by simple forms without animation and steps
const PropertyDetailsForm = ({ register, errors }) => {
  const loaderData = useLoaderData()

  console.log("loader data: ", loaderData)

  // TODO: use zod or yup to handle precise validation like rent can only be number
  return (
    <>
      {/* <form onSubmit={handleSubmit((data) => onSubmit(data))}> */}
      <h1 className="text-2xl font-medium">Property Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormInput
          label={"Rent Amount"}
          type={"text"}
          name={"rent"}
          flexChild
          placeholder={"3500"}
          small
          {...register("rent", { required: "Please provide monthly rent" })}
          error={errors["rent"]}
        />
        <FormInput
          label={"Initial Deposit"}
          type={"text"}
          name={"deposit"}
          flexChild
          placeholder={"9000"}
          small
          {...register("deposit")}
          error={errors["deposit"]}
        />
        <FormInput
          label={"Starting Date"}
          type={"text"}
          name={"startDate"}
          flexChild
          placeholder={"02/10/2021"}
          small
          {...register("startDate", { required: "Starting date is required" })}
          error={errors["startDate"]}
        />
        <FormInput
          label={"Ending Date"}
          type={"text"}
          name={"endDate"}
          flexChild
          placeholder={"02/10/2021"}
          small
          {...register("endDate")}
          error={errors["endDate"]}
        />
        <FormTextArea
          label={"Additional Terms"}
          name={"terms"}
          placeholder={"1- Term 1\n2- Term 2"}
          small
          {...register("terms")}
          error={errors["terms"]}
        />
      </div>
      {/* <button type="submit" className="btn btn-secondary btn-sm text-white mt-4">
        Submit
      </button> */}
      {/* </form> */}
    </>
  )
}

export default PropertyDetailsForm
