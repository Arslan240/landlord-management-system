import { useQueryClient } from "@tanstack/react-query"
import React from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

const PaginationContainer = ({ isFetching, properties, pagination, pageAction }) => {
  if (!pagination) return null

  const { pathname } = useLocation()
  const { pageCount, page } = pagination
  const dispatch = useDispatch()
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  if (pageCount < 2) {
    return null
  }

  const handlePageChange = (pageNumber) => {
    console.log("handle page change", pageNumber)
    dispatch(pageAction(pageNumber))
  }

  return (
    !isFetching &&
    properties?.length > 0 && (
      <div className="join">
        <button
          className="join-item btn hover:bg-secondary-lightest active:bg-secondary active:text-white sm:btn-md"
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) {
              prevPage += 1
              return
            }
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>
        {pagination &&
          pages.map((pageNumber) => {
            return (
              <button
                key={pageNumber}
                className={`join-item btn hover:bg-secondary-lightest ${pageNumber === page && "bg-secondary text-white"}`}
                onClick={() => {
                  handlePageChange(pageNumber)
                }}
              >
                {pageNumber}
              </button>
            )
          })}
        <button
          className="join-item btn hover:bg-secondary-lightest active:bg-secondary active:text-white sm:btn-md"
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) {
              nextPage -= 1
              return
            }
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    )
  )
}

export default PaginationContainer
