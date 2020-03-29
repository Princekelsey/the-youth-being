import React from "react"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const CustomPagination = ({ handleClick, currentPage, numberOfPages }) => {
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={currentPage <= 0}>
        <PaginationLink
          onClick={e => handleClick(e, currentPage - 1)}
          previous
          href="#"
        />
      </PaginationItem>

      {[...Array(numberOfPages)].map((page, i) => (
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={e => handleClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage >= numberOfPages - 1}>
        <PaginationLink
          onClick={e => handleClick(e, currentPage + 1)}
          next
          href="#"
        />
      </PaginationItem>
    </Pagination>
  )
}

export default CustomPagination
