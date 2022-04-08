import { useEffect, useState } from "react"

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }
  return range
}

export default function Pagination({ total, limit, onPageChanged }) {
  const [currentPage, setCurrentPage] = useState(1)

  let totalPages = Math.ceil(total / limit)
  const pageNeighbours = 1

  function fetchPageNumbers() {
    const totalNumbers = (pageNeighbours * 2) + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)

      const hasLeftPages = startPage > 2
      const hasRightPages = (totalPages - endPage) > 1
      const pagesOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) ... {5} [7] {8} (10)
        case (hasLeftPages && !hasRightPages): {
          const extraPages = range(startPage - pagesOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {3} [4] {5} ... (10)
        case (!hasLeftPages && hasRightPages): {
          const extraPages = range(endPage + 1, endPage + pagesOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) ... {5} [6] {7} ... (10)
        case (hasLeftPages && hasRightPages):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);

  }
  const pages = fetchPageNumbers()

  useEffect(() => {
    goToPage(1)
  }, [])

  const goToPage = page => {
    const currentPage = Math.max(0, Math.min(page, totalPages))
    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: limit,
      totalRecords: total
    }

    setCurrentPage(currentPage)
    onPageChanged(paginationData)
  }

  const handleClick = page => event => {
    event.preventDefault()
    goToPage(page)
  }

  const handlePreviousClick = event => {
    event.preventDefault()
    goToPage(currentPage - 1)
  }
  const handleNextClick = event => {
    event.preventDefault()
    goToPage(currentPage + 1)
  }

  const handleBackToFirst = event => {
    event.preventDefault()
    goToPage(1);
  }
  const handleGoToLastPage = event => {
    event.preventDefault()
    goToPage(totalPages);
  }

  return (
    <ul className="pagination">
      {totalPages > 6 ?
        <>
          <li>
            <button onClick={handleBackToFirst}>{"<<<"}</button>
          </li>
          <li>
            <button
              onClick={handlePreviousClick}
              disabled={currentPage == 1 ? true : false}

            >
              {"<"}
            </button>
          </li>
        </> : null
      }
      {pages.map((page, index) => {
        if (page === LEFT_PAGE || page === RIGHT_PAGE) return (
          <li key={index}>
            <button>...</button>
          </li>
        )
        return (
          <li key={index}>
            <button
              onClick={handleClick(page)}
              className={currentPage === page ? "button-active" : null}
            >
              {page}
            </button>
          </li>
        )
      })}
      {totalPages > 6 ?
        <>
          <li>
            <button
              onClick={handleNextClick}
              disabled={currentPage == totalPages ? true : false}
            >
              {">"}
            </button>
          </li>
          <li>
            <button onClick={handleGoToLastPage}>{">>>"}</button>
          </li>
        </> : null
      }
    </ul>
  )
}