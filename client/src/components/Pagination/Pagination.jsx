import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as S from '../../pages/LoanPosts/LoanPosts.Style';

const Pagination = ({ pagination, currentPage, setCurrentPage }) => (
  <S.Pagination>
    <S.PageButton
      onClick={() => setCurrentPage(prev => prev - 1)}
      disabled={!pagination.hasPrevPage}
    >
      <ChevronLeft size={16} />
    </S.PageButton>
    {Array.from({ length: pagination.totalPages }, (_, i) => (
      <S.PageButton
        key={i + 1}
        active={pagination.currentPage === i + 1}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </S.PageButton>
    ))}
    <S.PageButton
      onClick={() => setCurrentPage(prev => prev + 1)}
      disabled={!pagination.hasNextPage}
    >
      <ChevronRight size={16} />
    </S.PageButton>
  </S.Pagination>
);

export default Pagination;