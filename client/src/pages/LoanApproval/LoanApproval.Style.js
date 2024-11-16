import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
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
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DashboardHeader = styled.div`
  margin-bottom: 3rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(120deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const LoanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  perspective: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const LoanCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02),
              0 10px 15px rgba(0, 0, 0, 0.03),
              0 20px 30px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.$index * 0.1}s;
  opacity: 0;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.06),
                0 20px 30px rgba(0, 0, 0, 0.07);

    &:before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const LoanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const Amount = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;

  span {
    font-size: 1rem;
    color: #64748b;
    margin-left: 0.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;

    span {
      font-size: 0.875rem;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  background: ${props => {
    switch (props.$status) {
      case 'approved': return 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
      case 'rejected': return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      case 'waiting_approval': return 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)';
      default: return 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';
    }
  }};
  color: white;
  box-shadow: 0 2px 10px ${props => {
    switch (props.$status) {
      case 'approved': return 'rgba(16, 185, 129, 0.2)';
      case 'rejected': return 'rgba(239, 68, 68, 0.2)';
      case 'waiting_approval': return 'rgba(251, 191, 36, 0.2)';
      default: return 'rgba(148, 163, 184, 0.2)';
    }
  }};

  @media (max-width: 768px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
`;

export const LoanDetails = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  min-width: 100px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    min-width: unset;
  }
`;

export const DetailValue = styled.span`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding-top: 1rem;
    flex-direction: column;
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 0.875rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
  }

  &:hover:before {
    transform: translate(-50%, -50%) scale(2);
  }

  &.approve {
    background: linear-gradient(135deg, #34d399, #10b981);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(16, 185, 129, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &.reject {
    background: white;
    color: #ef4444;
    border: 2px solid #ef4444;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);

    &:hover {
      background: #ef4444;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(239, 68, 68, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.875rem;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  animation: ${fadeIn} 0.6s ease-out;

  h3 {
    color: #1e293b;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #64748b;
    font-size: 1.125rem;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;

    h3 {
      font-size: 1.25rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;
