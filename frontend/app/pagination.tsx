import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleButtonClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageButtons = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => (
        <button
          name = {`page-${i + 1}`}
          key={i + 1}
          className={currentPage === i + 1 ? 'active' : ''}
          onClick={() => handleButtonClick(i + 1)}
        >
          {i + 1}
        </button>
      ));
    } else {
      let buttons: number[];  // Type annotation for buttons array
      if (currentPage < 3) {
        buttons = [1, 2, 3, 4, 5];
      } else if (currentPage > totalPages - 2) {
        buttons = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        buttons = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
      }

      return buttons.map((pageNumber) => (
        <button
          name = {`page-${pageNumber}`}
          key={pageNumber}
          className={currentPage === pageNumber ? 'active' : ''}
          onClick={() => handleButtonClick(pageNumber)}
          style={{ fontWeight: pageNumber === currentPage ? 'bold' : 'normal' }}
        >
          {pageNumber}
        </button>
      ));
    }
  };

  const renderFirstPrevButtons = () => (
    <>
      <button name = 'first' className={currentPage === 1 ? 'disabled' : ''} onClick={() => handleButtonClick(1)}>First </button>
      <button name = 'previous' className={currentPage === 1 ? 'disabled' : ''} onClick={() => handleButtonClick(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
    </>
  );

  const renderNextLastButtons = () => (
    <>
      <button name = 'next' className={currentPage === totalPages ? 'disabled' : ''} onClick={() => handleButtonClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      <button name = 'last' className={currentPage === totalPages ? 'disabled' : ''} onClick={() => handleButtonClick(totalPages)}>Last</button>
    </>
  );

  return (
    <div className="pagination">
      {renderFirstPrevButtons()}
      {renderPageButtons()}
      {renderNextLastButtons()}
    </div>
  );
};

export default Pagination;