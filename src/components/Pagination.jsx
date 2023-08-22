import React from 'react'

function Pagination({
    items,
    currentPage,
    pageSize,
    onPageChange
}) {
    const pagesCount = Math.ceil(items / pageSize); 
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    
    return (
        <div className='pagination'>
            {pages.map((page) => (
                <div
                    key={page}
                    className={
                        page === currentPage ? 'page active' : 'page'
                    }
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    )
}

export default Pagination