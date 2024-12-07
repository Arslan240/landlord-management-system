import { motion } from "motion/react"
import { useForm } from "react-hook-form"
import FormInput from "../FormInput"
import CheckBoxInput from "../CheckBoxInput"
import Dropzone from "../Dropzone"
import { toast } from "react-toastify"
import { useState } from "react"
import { validateDate } from "../../utils/validateDate"

// for time being we don't need multi steps in the form so we'll start by simple forms without animation and steps
const TenantDetailsForm = ({ acceptedFiles, setAcceptedFiles, watch, register, errors }) => {
  const offlineTenant = watch("isOffline")

  return (
    <>
      {/* <form onSubmit={handleSubmit((data) => onSubmit(data))}> */}
      <h1 className="text-2xl font-medium">Tenant Details</h1>
      <CheckBoxInput label={"Is tenant offline?"} name={"isOffline"} {...register("isOffline")} error={errors["isOffline"]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormInput
          label={"Name"}
          type={"text"}
          name={"name"}
          flexChild
          placeholder={"John Jackie"}
          small
          {...register("name", {
            required: "Please provide name of tenant",
          })}
          error={errors["name"]}
        />
        {offlineTenant ? (
          <>
            <FormInput
              label={"Occupation"}
              type={"text"}
              name={"occupation"}
              small
              placeholder={"Engineering Manager"}
              {...register("occupation", {
                required: "Please provide occupation of tenant",
              })}
              error={errors["occupation"]}
              flexChild
            />
            <FormInput
              label={"Date of Birth"}
              type={"text"}
              name={"dob"}
              small
              placeholder={"DD/MM/YYYY"}
              {...register("dob", {
                required: "Please provide date of birth",
                validate: validateDate,
              })}
              error={errors["dob"]}
              flexChild
            />
            <FormInput
              label={"Govt identification number"}
              type={"text"}
              name={"idNumber"}
              small
              placeholder={"XXHJHDJJDJU"}
              {...register("idNumber", {
                required: "Please provide govt identification number",
              })}
              error={errors["idNumber"]}
              flexChild
            />
            <FormInput
              label={"Annual Salary"}
              type={"text"}
              name={"salary"}
              small
              placeholder={"45000"}
              {...register("salary")}
              error={errors["salary"]}
              flexChild
            />
            <div>
              <label className="font-medium inline-block">Tenant Image</label>
              <Dropzone
                acceptedFiles={acceptedFiles}
                setAcceptedFiles={setAcceptedFiles}
                maxFiles={1}
                maxFilesMessage={"You can only upload 1 image"}
                minimalist
              />
            </div>
          </>
        ) : (
          <FormInput
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"John Jackie"}
            flexChild
            small
            {...register("email", {
              required: "Please provide email of tenant",
            })}
            error={errors["email"]}
          />
        )}
      </div>
      {/* <button type="submit" className="btn btn-secondary btn-sm text-white mt-4">
        Submit
      </button> */}
      {/* </form> */}
    </>
  )
}

export default TenantDetailsForm
