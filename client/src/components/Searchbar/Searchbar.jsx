import React from 'react';
import { Search } from 'lucide-react';
import * as S from '../../pages/LoanPosts/LoanPosts.Style';

const SearchBar = ({ search, setSearch }) => (
  <S.SearchContainer>
    <S.SearchIcon>
      <Search size={20} />
    </S.SearchIcon>
    <S.SearchInput
      placeholder="Search loans..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </S.SearchContainer>
);

export default SearchBar;