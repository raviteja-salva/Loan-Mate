import styled, { keyframes, css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const breatheAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;


export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  svg {
    animation: ${breatheAnimation} 4s ease-in-out infinite;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$sidebarWidth};
  background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 1.5rem;
  z-index: 50;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  animation: ${slideIn} 0.4s ease-out;

  @media (max-width: 768px) {
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  }
`;

export const NavSection = styled.nav`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #e2e8f0;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  gap: 0.75rem;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(4px);

    svg {
      transform: scale(1.1);
    }
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #e2e8f0;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  gap: 0.75rem;
  margin-top: auto;

  &:hover {
    background-color: rgba(239, 68, 68, 0.2);
    color: #fecaca;
    transform: translateX(4px);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;


export const Content = styled.main`
  margin-left: ${props => props.$isOpen ? props.$sidebarWidth : '0'};
  margin-top: 64px;
  padding: 2rem;
  flex: 1;
  animation: ${fadeIn} 0.4s ease-out;
  transition: all 0.3s ease-in-out;
  min-height: calc(100vh - 64px);

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1.5rem;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => props.$isOpen ? props.$sidebarWidth : '0'};
  height: 70px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 40;
  animation: ${fadeIn} 0.4s ease-out;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    left: 0;
    padding: 0 1rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:focus-within {
    background: white;
    border-color: #e2e8f0;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  padding: 0.25rem 0.5rem;
  width: 200px;
  outline: none;
  color: #1f2937;
  font-size: 0.875rem;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: #f8fafc;
    color: #1e40af;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const NotificationBadge = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background-color: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
    animation: ${pulseAnimation} 2s infinite;
  }
`;

export const ProfileButton = styled(IconButton)`
  background: #f8fafc;
  color: #1e40af;
  border: 1px solid #e2e8f0;

  &:hover {
    background: #f1f5f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

export const MenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 12px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

export const ProfileContainer = styled.div`
  position: relative;
`;

export const UserInfo = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 8px;
`;

export const UserName = styled.div`
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const UserEmail = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;