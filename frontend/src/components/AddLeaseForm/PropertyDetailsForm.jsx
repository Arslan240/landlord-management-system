import { Link, useLoaderData } from "react-router-dom"
import FormInput from "../FormInput"
import FormTextArea from "../FormTextArea"
import { SelectInput } from "../SelectInput"
import { validateDate } from "../../utils/validateDate"

const propertySelectOptions = (properties) => {
  if (!properties) return []

  return properties.map(({ name, _id: id, address }) => {
    if (name) return { option: name, value: id }
    return { option: `${address.plotNo}, ${address.street}, ${address.city}`, value: id }
  })
}

// for time being we don't need multi steps in the form so we'll start by simple forms without animation and steps
const PropertyDetailsForm = ({ register, errors }) => {
  const loaderData = useLoaderData()
  const { properties } = loaderData
  // TODO: if properties is an empty array or null/undefined. Don't show propertyDetails form at all and only show button to add property. As it's hard to integrate the button with react hook form. inside onSubmit just check the loader data if no properties, then show error under the button.

  const selectOptions = propertySelectOptions(properties)

  // TODO: use zod or yup to handle precise validation like rent can only be number
  return (
    <>
      {/* <form onSubmit={handleSubmit((data) => onSubmit(data))}> */}
      <h1 className="text-2xl font-medium pb-2">Property Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* {selectOptions.length <= 0 ? ( */}
        <div className={`${selectOptions.length > 0 ? "hidden" : ""}`}>
          <label htmlFor="" className="block text-sm font-medium mb-1 capitalize">
            No properties Available
          </label>
          <Link to={"/dashboard/properties/add-property?redirect=/dashboard/leases/add-lease"}>
            <button type="button" className="btn btn-sm btn-success text-white">
              Add new property
            </button>
          </Link>
          {errors["propertyId"] && <p className="text-warning py-1">{errors["propertyId"].message}</p>}
        </div>
        {/* ) : ( */}
        <SelectInput
          label={"Select from your properties"}
          name={"propertyId"}
          options={selectOptions}
          {...register("propertyId")}
          error={errors["propertyId"]}
          flexChild
          small
          hidden={selectOptions.length <= 0}
        />
        {/* )} */}
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
          {...register("startDate", { required: "Starting date is required", validate: validateDate })}
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
