import React from 'react'

function DataTablePagination({productsPerPage, curentPage, setCurrentPage, totolProduct}) {

    const pageNumbers = []     

    for (let index = 1; index <= Math.ceil(totolProduct / productsPerPage); index++){
        pageNumbers.push(index)       
    }

    const onPreviusPage = () => {
        setCurrentPage(curentPage - 1)
    }

    const onNextPage = () => {
        setCurrentPage(curentPage + 1)
    }

    const onSpecificPage = (indice) => {
        setCurrentPage(indice)
    }
    
  return (
    /* eslint-disable */
    <nav className="pagination is-centered mb-6" role="navigation" aria-label="pagination">
        <a className={`pagination-previous ${ curentPage === 1 ? 'is-disabled' : ''}`} onClick={onPreviusPage}>Anterior</a>
        <a className={`pagination-next ${ curentPage >= pageNumbers.length ? 'is-disabled' : ''}`} onClick={onNextPage}>Siguiente</a>
        <ul className="pagination-list">
            {
                pageNumbers.map( noPage => (
                    <li key={noPage}>
                        <a className={`pagination-link ${noPage === curentPage ? 'is-current' : ''}`} 
                            onClick={ () => onSpecificPage(noPage) }>{noPage}
                        </a>
                    </li>
                ))
            }            
        </ul>
    </nav>
    /* eslint-enable */
  )
}

export default DataTablePagination