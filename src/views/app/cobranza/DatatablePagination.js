import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink    
  } from 'reactstrap';

function DataTablePagination({productsPerPage, curentPage, setCurrentPage, totolProduct}) {
    const [canPrevious, setCanPrevious] = useState(false);
    const [canNext, setCanNext] = useState(false);

    useEffect( () => {
      if( totolProduct > 0){
        setCanNext(true)
      }
      
    },[totolProduct])

    const pageNumbers = []     

    for (let index = 1; index <= Math.ceil(totolProduct / productsPerPage); index++){
        pageNumbers.push(index)       
    }

    const onPreviusPage = () => {
        // console.log("currenPage antes", curentPage)
        setCurrentPage(curentPage - 1)
        // console.log("currenPage despues", curentPage)
        setCanPrevious(curentPage - 1 !== 1)
        setCanNext(curentPage - 1)
    }

    const onNextPage = () => {
        setCurrentPage(curentPage + 1)        
        setCanNext(curentPage + 1  < pageNumbers.length)
        setCanPrevious(curentPage + 1)
    }

    const onSpecificPage = (indice) => {
        setCurrentPage(indice)        
        setCanPrevious(indice !== 1) // !canPrevious && 'disabled'
        setCanNext(indice !== pageNumbers.length)
    }
        
    // const canPrevious = false
    // const canNext = true
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

    /* eslint-disable */
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
      /* eslint-enable */
    
  return (
    /* eslint-disable */
    <>
        <div className="text-center">
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
                      onPreviusPage()
                  }}
                  disabled={!canPrevious}
                  >
                  <i className="simple-icon-arrow-left" />
                </PaginationLink>
            </PaginationItem>

            {/* {renderPages()}  */}

            {
                    pageNumbers.map( noPage => (
                        <PaginationItem key={noPage} active={noPage === curentPage}>
                            <PaginationLink onClick={() => onSpecificPage(noPage)}>{noPage}</PaginationLink>
                        </PaginationItem>                   
                    ))
                }

            <PaginationItem className={`${!canNext && 'disabled'}`}>
                <PaginationLink
                className="next"
                onClick={() => {
                    if (!canNext) return;
                    // changePage(page + 1);
                    onNextPage()
                }}
                disabled={!canNext}
                >
                <i className="simple-icon-arrow-right" />
                </PaginationLink>
            </PaginationItem>
            </Pagination>
        </div>
    </>
    /* eslint-enable */
  )
}

export default DataTablePagination