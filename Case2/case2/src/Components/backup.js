
const MAX_ITEMS = 7
const MAX_LEFT = (MAX_ITEMS - 1) / 2
const PAGE_NEIGHBOURS = 1

const Pagination = ({ offset, limit, total, setOffset }) => {
  const currentPage = offset ? (offset / limit) + 1 : 1
  const pages = Math.ceil(total / limit)
  const firstItem = Math.max(currentPage - MAX_LEFT, 1)

  return (
    <ul className="pagination">
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + firstItem)
        .map(page =>
          page <= total ?
            <li key={page}>
              <button onClick={() => setOffset((page - 1) * limit)}>{page}</button>
            </li> : null
        )
      }
    </ul>
  )

}

export default Pagination


// corrigir bugs
  // pags infinitas


// como juntar a lista e a paginacao
// fazer a logica dos '...'

// implementar botoes
  // avançar e retroceder
  // ultimo e primeiro

