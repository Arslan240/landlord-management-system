import { motion } from "motion/react"
import { useForm } from "react-hook-form"
import FormInput from "../FormInput"
import { useAddPropertyContext } from "../../pages/AddProperty"
import { useEffect } from "react"

const PropertyAddressForm = ({ variants }) => {
  const { step, totalSteps, formState, DURATION, onSubmit, handleNext, handlePrev } = useAddPropertyContext()
  const defaultValues = formState?.step1
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues, mode: "onBlur" }) //triggers validation on onBlur (focus lost)

  console.log(formState)
  console.log("defaultValues: ", defaultValues)

  // instead of handleNext directly on next button, if we do this the isSubmitSuccessful is provided by useForm, it's only true, when form is submitted successfully. We simply call the handleNext provided by the context.
  // its very simple approach as compared to all approaches that i tried before.
  useEffect(() => {
    if (isSubmitSuccessful) {
      handleNext()
    }
  }, [isSubmitSuccessful])

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" transition={{ duration: DURATION }}>
      <form onSubmit={handleSubmit((data) => onSubmit(data, step))}>
        <FormInput
          name={"name"}
          label={"Name of building"}
          placeholder={"Name"}
          small={true}
          error={errors.name}
          {...register("name", { required: "Name is required" })}
        />
        <FormInput
          name={"plotNo"}
          label={"Address of unit / home / building"}
          placeholder={"Plot no"}
          small={true}
          error={errors.plotNo}
          {...register("plotNo", { required: "Plot no. is required" })}
        />
        <FormInput
          name={"street"}
          placeholder={"Street Address"}
          small={true}
          error={errors.street}
          {...register("street", { required: "Street address is required" })}
        />
        <div className="flex gap-2 h-full ">
          <FormInput
            name={"city"}
            placeholder={"City"}
            flexChild={true}
            small={true}
            error={errors.city}
            {...register("city", { required: "City is required" })}
          />
          <FormInput
            name={"state"}
            placeholder={"State"}
            flexChild={true}
            small={true}
            error={errors.state}
            {...register("state", { required: "State is required" })}
          />
        </div>
        <div className="flex gap-2 h-full ">
          <FormInput
            name={"postalCode"}
            placeholder={"Postal Code"}
            small={true}
            error={errors.postalCode}
            {...register("postalCode", { required: "Postal code is required" })}
          />
          <FormInput
            name={"country"}
            placeholder={"Country"}
            small={true}
            error={errors.country}
            {...register("country", { required: "Country is required" })}
          />
        </div>
        <div className="mx-auto pt-3 flex gap-2 place-content-end">
          <button className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50" disabled={step === 1} onClick={handlePrev}>
            Prev
          </button>
          <button type="submit" className="btn btn-secondary btn-md disabled:border-primary-light disabled:opacity-50" disabled={step === totalSteps}>
            Next
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default PropertyAddressForm
