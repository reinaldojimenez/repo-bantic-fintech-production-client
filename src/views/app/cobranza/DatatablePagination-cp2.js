import React from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink    
  } from 'reactstrap';

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

    const canPrevious = false
    const canNext = true
    const pages = totolProduct
    const pageState = curentPage -1
    const paginationMaxSize = productsPerPage

    /* eslint-disable */
    const changePage = (_page) => {
        const p = getSafePage(_page);
    
        if (p !== pageState) {
          setPageState(p);
          onPageChange(p);
        }
    };

    const pageClick = (pageIndex) => {
        // changePage(pageIndex);
    };
    /* eslint-enable */

    const renderPages = () => {
        const totalPages = pages;
        let endPage = pages;
        const currentPage = pageState;
        let startPage = 0;
        const maxSize = paginationMaxSize;
    
        if (maxSize) {
          if (endPage > maxSize) {
            startPage = Math.max(currentPage + 1 - Math.floor(maxSize / 2), 1);
            endPage = startPage + maxSize - 1;
            if (endPage > totalPages) {
              endPage = totalPages;
              startPage = endPage - maxSize + 1;
            }
            startPage -= 1;
          }
        }
    
        const pageButtons = [];
        for (let i = startPage; i < endPage; i += 1) {
          const active = currentPage === i;
          pageButtons.push(
            <PaginationItem key={i} active={active}>
              <PaginationLink onClick={() => pageClick(i)}>{i + 1}</PaginationLink>
            </PaginationItem>
          );
        }
        // console.log(pageButtons)
        return pageButtons;
      };
    
  return (
    /* eslint-disable */
    <>
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

    <Pagination
          className="d-inline-block"
          size="sm"
          listClassName="justify-content-center"
          aria-label="Page navigation example"
        >
          <PaginationItem className={`${!canPrevious && 'disabled'}`}>
            <PaginationLink
              className="prev"
              onClick={() => {
                if (!canPrevious) return;
                // changePage(page - 1);
              }}
              disabled={!canPrevious}
            >
              <i className="simple-icon-arrow-left" />
            </PaginationLink>
          </PaginationItem>

           {renderPages()} 

          <PaginationItem className={`${!canNext && 'disabled'}`}>
            <PaginationLink
              className="next"
              onClick={() => {
                if (!canNext) return;
                changePage(page + 1);
              }}
              disabled={!canNext}
            >
              <i className="simple-icon-arrow-right" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>

    </>
    /* eslint-enable */
  )
}

export default DataTablePagination