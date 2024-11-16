import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: ${fadeInUp} 0.6s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding-bottom: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const LoanAmount = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '₹';
    font-size: 24px;
    color: #475569;
  }

  @media (max-width: 768px) {
    font-size: 24px;

    &::before {
      font-size: 20px;
    }
  }
`;

export const Status = styled.span`
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.status === 'pending' 
    ? 'rgba(234, 179, 8, 0.1)'
    : 'rgba(34, 197, 94, 0.1)'};
  color: ${props => props.status === 'pending' 
    ? '#ca8a04'
    : '#15803d'};
  border: 1px solid ${props => props.status === 'pending'
    ? 'rgba(234, 179, 8, 0.2)'
    : 'rgba(34, 197, 94, 0.2)'};

  @media (max-width: 768px) {
    padding: 4px 12px;
    font-size: 12px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #64748b;
  font-size: 15px;
  padding: 8px 0;
  transition: all 0.2s;

  &:hover {
    color: #475569;
    transform: translateX(4px);
  }

  svg {
    color: #6366f1;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    gap: 8px;
    padding: 4px 0;
    
    &:hover {
      transform: none;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ApplyButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 8px;
  background: ${props => props.disabled ? '#e2e8f0' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, 
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    animation: ${shimmer} 2s infinite;
    display: ${props => props.disabled ? 'none' : 'block'};
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
    border-radius: 8px;
    margin-top: 16px;
    
    &:hover:not(:disabled) {
      transform: none;
      box-shadow: none;
    }
  }
`;

// Add responsive styles for the grid container
export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;


// import styled, { keyframes } from 'styled-components';

// const fadeInUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const shimmer = keyframes`
//   0% {
//     background-position: -468px 0;
//   }
//   100% {
//     background-position: 468px 0;
//   }
// `;

// export const Card = styled.div`
//   background: white;
//   border-radius: 16px;
//   padding: 24px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//   animation: ${fadeInUp} 0.6s ease-out;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   border: 1px solid rgba(0, 0, 0, 0.05);

//   &:hover {
//     transform: translateY(-8px);
//     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//   }
// `;

// export const CardHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 24px;
//   padding-bottom: 16px;
//   border-bottom: 1px solid #f1f5f9;
// `;

// export const LoanAmount = styled.div`
//   font-size: 28px;
//   font-weight: 700;
//   color: #1e293b;
//   display: flex;
//   align-items: center;
//   gap: 4px;

//   &::before {
//     content: '₹';
//     font-size: 24px;
//     color: #475569;
//   }
// `;

// export const Status = styled.span`
//   padding: 6px 16px;
//   border-radius: 999px;
//   font-size: 13px;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   background: ${props => props.status === 'pending' 
//     ? 'rgba(234, 179, 8, 0.1)'
//     : 'rgba(34, 197, 94, 0.1)'};
//   color: ${props => props.status === 'pending' 
//     ? '#ca8a04'
//     : '#15803d'};
//   border: 1px solid ${props => props.status === 'pending'
//     ? 'rgba(234, 179, 8, 0.2)'
//     : 'rgba(34, 197, 94, 0.2)'};
// `;

// export const CardContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// export const InfoItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   color: #64748b;
//   font-size: 15px;
//   padding: 8px 0;
//   transition: all 0.2s;

//   &:hover {
//     color: #475569;
//     transform: translateX(4px);
//   }

//   svg {
//     color: #6366f1;
//   }
// `;

// export const ApplyButton = styled.button`
//   width: 100%;
//   padding: 14px;
//   margin-top: 8px;
//   background: ${props => props.disabled ? '#e2e8f0' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'};
//   color: white;
//   border: none;
//   border-radius: 12px;
//   font-weight: 600;
//   font-size: 15px;
//   cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   position: relative;
//   overflow: hidden;

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(to right, 
//       transparent 0%,
//       rgba(255, 255, 255, 0.1) 50%,
//       transparent 100%
//     );
//     animation: ${shimmer} 2s infinite;
//     display: ${props => props.disabled ? 'none' : 'block'};
//   }

//   &:hover:not(:disabled) {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
//   }

//   &:active:not(:disabled) {
//     transform: translateY(0);
//   }
// `;