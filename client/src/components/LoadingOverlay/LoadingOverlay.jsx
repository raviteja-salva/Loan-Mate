import React from 'react';
import { Loader } from 'lucide-react';
import * as S from '../../pages/LoanPosts/LoanPosts.Style';

const LoadingOverlay = () => (
  <S.LoadingOverlay>
    <Loader className="animate-spin" size={32} />
  </S.LoadingOverlay>
);

export default LoadingOverlay;