import React from "react"
import Avatar from "./Avatar"

const TableRenderer = ({ headings, valueRows, badgeIndex, successTerm, small = false }) => {
  return (
    <div className="overflow-x-auto pt-2 pb-2 ">
      <table className="table-auto rounded-lg w-full  shadow-md">
        {/* Table Head */}
        <thead className="text-left">
          <tr className="bg-indigo-50">
            <th className="px-6 py-3 font-normal text-primary">No.</th>
            {headings.map((heading) => (
              <th className="px-6 py-3 font-normal text-primary">{heading}</th>
            ))}
            {/* <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">Street Add</th>
            <th className="px-6 py-3">City</th>
            <th className="px-6 py-3">Rent</th>
            <th className="px-6 py-3">Beds</th>
            <th className="px-6 py-3">Baths</th>
            <th className="px-6 py-3">Available</th>
            <th className="px-6 py-3">Ratings</th> */}
          </tr>
        </thead>
        <tbody>
          {valueRows.map((valueRow, index) => (
            <TableRow row={valueRow} index={index} badgeIndex={badgeIndex} successTerm={successTerm} small={small} />
          ))}
          {/* {properties.map((item, index) => (
            <ListProperty {...item} key={item._id} index={index + 1} />
          ))} */}
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({ row, index, clickHandler, badgeIndex = { badgeIndex }, successTerm = { successTerm }, small }) => {
  return (
    <tr className="border-b text-xs hover:bg-primary-hoverlight cursor-pointer" onClick={clickHandler}>
      <td className="px-6">{index + 1}</td>

      {row.map((value, index) => (
        <>
          {badgeIndex === index ? (
            <td className={`px-6 ${small ? "py-2" : "py-3"}`}>
              <span
                className={`${
                  value === successTerm ? "bg-accent-light text-accent" : "bg-warning-light text-warning"
                } badge badge-ghost border-none text-xs p-3`}
              >
                {value === successTerm ? "Available" : "Occupied"}
              </span>
            </td>
          ) : (
            <td className={`px-6 ${small ? "py-2" : "py-3"}`}>
              <div className="flex flex-row items-center gap-1.5">
                {index === 0 && <Avatar small />}
                {value}
              </div>
            </td>
          )}
        </>
      ))}
      {/* <td className="px-6 py-4">{index}</td>
      <td className="px-6 py-4">{streetAdd}</td>
      <td className="px-6 py-4">{address.city}</td>
      <td className="px-6 py-4">${details.rent}</td>
      <td className="px-6 py-4">{details.beds}</td>
      <td className="px-6 py-4">{details.baths}</td>
      <td className="px-6 py-4">4.5</td> */}
    </tr>
  )
}

export default TableRenderer
