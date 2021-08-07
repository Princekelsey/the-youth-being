import React from "react"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const PaginationLinks = ({ currentPage, numberOfPages }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numberOfPages
  const prevPage =
    currentPage - 1 === 1 ? "/posts" : "/page/" + (currentPage - 1).toString()
  const nextPage = "/page/" + (currentPage + 1).toString()

  return (
    // <div id="client-paginator"></div>
    <Pagination
      aria-label="Page navigation example"
      className="table-responsive mb-2 py-3"
    >
      {isFirstPage ? (
        <PaginationItem disabled>
          <PaginationLink previous href="/"></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous href={prevPage}></PaginationLink>
        </PaginationItem>
      )}

      {Array.from({ length: numberOfPages }, (ele, index) =>
        currentPage === index + 1 ? (
          <PaginationItem active key={`page-number${index + 1}`}>
            <PaginationLink
              href={`/${index === 0 ? "posts" : "page/" + (index + 1)} `}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={`page-number${index + 1}`}>
            <PaginationLink
              href={`/${index === 0 ? "posts" : "page/" + (index + 1)} `}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )
      )}

      {isLastPage ? (
        <PaginationItem disabled>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      )}
    </Pagination>
  )
}

export default PaginationLinks
