import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

export const LoadingText = styled.p`
  font-size: 1rem;
  color: #4b5563;
  font-weight: 500;
  margin: 0;
  opacity: 0.8;
`;