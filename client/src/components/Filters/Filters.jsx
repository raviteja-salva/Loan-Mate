import React from 'react';
import { Calendar, DollarSign, Clock } from 'lucide-react';
import * as S from '../../pages/LoanPosts/LoanPosts.Style';

const Filters = ({ activeFilter, setActiveFilter }) => (
  <S.FiltersContainer>
    <S.FilterButton
      className={activeFilter === '-createdAt' ? 'active' : ''}
      onClick={() => setActiveFilter('-createdAt')}
    >
      <Calendar size={16} />
      Latest
    </S.FilterButton>
    <S.FilterButton
      className={activeFilter === 'interestRate' ? 'active' : ''}
      onClick={() => setActiveFilter('interestRate')}
    >
      <DollarSign size={16} />
      Interest Rate
    </S.FilterButton>
    <S.FilterButton
      className={activeFilter === 'maxDuration' ? 'active' : ''}
      onClick={() => setActiveFilter('maxDuration')}
    >
      <Clock size={16} />
      Duration
    </S.FilterButton>
  </S.FiltersContainer>
);

export default Filters;