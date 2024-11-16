import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ContentWrapper = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin-right: 16px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right: 0;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 4px;
    
    /* Hide scrollbar for cleaner mobile look */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  &:hover {
    border-color: #4f46e5;
    color: #4f46e5;
  }

  &.active {
    background: #4f46e5;
    border-color: #4f46e5;
    color: white;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.2s;

  @media (max-width: 768px) {
    padding: 16px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

export const LoanAmount = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 80px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0 16px;

  @media (max-width: 768px) {
    gap: 6px;
    padding: 0 8px;
  }
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: ${props => props.active ? '#4f46e5' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 14px;
    min-width: 36px;
  }

  &:hover:not(:disabled) {
    border-color: #4f46e5;
    color: ${props => props.active ? 'white' : '#4f46e5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  &:hover {
    background: #f1f1f1;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;


export const SubmitButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: #1d4ed8;
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;