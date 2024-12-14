import React from "react"
import Avatar from "./Avatar"

const TableRenderer = ({ headings, valueRows, successTerm, small = false }) => {
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
          </tr>
        </thead>
        <tbody>
          {valueRows.map((valueRow, index) => (
            <TableRow row={valueRow} index={index} successTerm={successTerm} small={small} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({ row, index, clickHandler, successTerm, small }) => {
  return (
    <tr className="border-b text-xs bg-[#fafafa] hover:bg-indigo-50 cursor-pointer" onClick={clickHandler}>
      <td className="px-6">{index + 1}</td>

      {row.map(({ type, value }, index) => (
        <>
          {type === "badge" ? (
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
            <>
              <td className={`px-6 ${small ? "py-2" : "py-3"}`}>
                <div className="flex flex-row items-center gap-1.5">
                  {type === "avatar" && <Avatar small />}
                  {value}
                </div>
              </td>
            </>
          )}
        </>
      ))}
    </tr>
  )
}

export default TableRenderer
