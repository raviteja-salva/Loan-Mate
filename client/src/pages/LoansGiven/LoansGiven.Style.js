import styled, { keyframes, css } from 'styled-components';
import {  
    Search,
  } from 'lucide-react';

const slideInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(37, 99, 235, 0.2); }
  50% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.4); }
  100% { box-shadow: 0 0 5px rgba(37, 99, 235, 0.2); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: transparent;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DashboardHeader = styled.div`
  margin-bottom: 3rem;
  animation: ${slideInUp} 0.6s ease-out;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 2px;
    animation: ${glowAnimation} 2s infinite;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 12px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
`;


export const TableContainer = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  animation: ${slideInUp} 0.6s ease-out;
  animation-delay: 0.3s;
  border: 1px solid rgba(59, 130, 246, 0.1);

  @media (max-width: 1024px) {
    overflow-x: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 1.5rem;
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #3b82f6;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

export const Td = styled.td`
  padding: 1.5rem;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s ease;
`;

export const Tr = styled.tr`
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
    transform: scale(1.01);

    ${Td} {
      color: #3b82f6;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.status === 'approved' ? `
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #166534;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 10px rgba(22, 101, 52, 0.2);
    }
  ` : `
    background: linear-gradient(135deg, #fef9c3 0%, #fef08a 100%);
    color: #854d0e;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 10px rgba(133, 77, 14, 0.2);
    }
  `}
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: ${pulseAnimation} 1s ease-in-out infinite;
  margin: 4rem auto;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  animation: ${floatAnimation} 3s ease-in-out infinite;

  svg {
    width: 64px;
    height: 64px;
    color: #3b82f6;
    margin-bottom: 1rem;
  }
`;

export const PayButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
