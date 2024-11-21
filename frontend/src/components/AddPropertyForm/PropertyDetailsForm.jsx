import { motion } from "motion/react"
import FormInput from "../FormInput"

import { Bath, Bed, CarFront, Dog, LampDesk } from "lucide-react"
import { useForm } from "react-hook-form"
import { useAddPropertyContext } from "../../pages/AddProperty"
import { useEffect } from "react"
import { SelectInput } from "../SelectInput"
import CheckBoxInput from "../CheckBoxInput"

const PropertyDetailsForm = ({ variants, custom }) => {
  const { step, totalSteps, formState, onSubmit, DURATION, handleNext, handlePrev } = useAddPropertyContext()
  const defaultValues = formState?.step2
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues, mode: "onBlur" }) //triggers validation on onBlur (focus lost)

  useEffect(() => {
    if (isSubmitSuccessful) {
      handleNext()
    }
  }, [isSubmitSuccessful])

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" custom={custom} transition={{ duration: DURATION }}>
      <form onSubmit={handleSubmit((data) => onSubmit(data, step))}>
        <SelectInput
          label="Category of Property"
          options={["Apartment", "Single Family House", "Townhouse", "Condo"]}
          defaultValue={"Single Family House"}
          small
          name={"category"}
          {...register("category", { required: "Category is required" })}
          error={errors.category}
        />
        <div className="flex gap-2">
          <FormInput
            name={"beds"}
            label="Beds"
            placeholder={"No. of beds"}
            flexChild={true}
            small
            labelIcon={<Bed size={"1rem"} />}
            {...register("beds", { required: "No. of beds are required" })}
            error={errors.beds}
          />
          <FormInput
            name={"baths"}
            label="Baths"
            placeholder={"No. of baths"}
            flexChild={true}
            small
            labelIcon={<Bath size={"1rem"} />}
            {...register("baths", { required: "No. of baths are required" })}
            error={errors.baths}
          />
        </div>
        <div className="flex gap-2">
          <FormInput
            name={"sqft"}
            label="Sqft"
            placeholder={"Sqft"}
            small={true}
            labelIcon={<div>⏍</div>}
            {...register("sqft", { required: "Sqft of property is required" })}
            error={errors.sqft}
          />
          <FormInput
            name={"garage"}
            label="Garages"
            placeholder={"No. of garages"}
            small
            labelIcon={<CarFront size={"1rem"} />}
            {...register("garage")}
            error={errors.garage}
          />
        </div>
        <FormInput
          name={"rent"}
          label="$ Rent"
          type={"text"}
          small
          placeholder={"$ 359.99"}
          flexChild
          {...register("rent", { required: "Rent is required" })}
          error={errors.rent}
        />
        <FormInput
          name={"yearBuilt"}
          label="Built in (Year)"
          type={"text"}
          small
          placeholder={"19XX"}
          {...register("yearBuilt", { required: "Building in year is required" })}
          error={errors.yearBuilt}
        />
        <CheckBoxInput name={"available"} label={"Is the property available?"} defaultChecked {...register("available")} error={errors.available} />
        <CheckBoxInput
          name={"furnished"}
          label={"Is the property Furnished?"}
          labelIcon={<LampDesk size={"1rem"} />}
          {...register("furnished")}
          error={errors.furnished}
        />
        <CheckBoxInput
          name={"petFriendly"}
          label={"Is the property pet friendly?"}
          labelIcon={<Dog size={"1rem"} />}
          {...register("petFriendly")}
          error={errors.petFriendly}
        />
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

export default PropertyDetailsForm
