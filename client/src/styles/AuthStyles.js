import styled, { keyframes, css } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const breathe = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Common styles
const focusStyles = css`
  &:focus {
    outline: none;
    border-color: #3e92cc;
    box-shadow: 0 0 0 4px rgba(62, 146, 204, 0.1);
  }
`;

const glassEffect = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(120deg, #0a2463 0%, #1e3f7f 50%, #3e92cc 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const IntroSection = styled.div`
  flex: 1;
  padding: 4rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 1.2s ease-out;
  position: relative;
  z-index: 1;
  background: transparent;

  @media (max-width: 968px) {
    padding: 2rem;
    text-align: center;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: transparent;
  backdrop-filter: blur(10px);
  
  @media (max-width: 968px) {
    padding: 2rem 1rem;
  }
`;

export const Form = styled.form`
  background: rgba(255, 255, 255, 0.95);
  padding: 3.5rem;
  padding-right:4rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  animation: ${fadeIn} 1s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    color: #0a2463;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    width: 100%;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
   
  }
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #eef2f7;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #3e92cc;
    box-shadow: 0 0 0 4px rgba(62, 146, 204, 0.1);
    background: #ffffff;
  }
  
  &::placeholder {
    color: #a0aec0;
    transition: color 0.3s ease;
  }
  
  &:hover {
    border-color: #cbd5e0;
    background: #ffffff;
    
    &::placeholder {
      color: #718096;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 1.2rem;
  background: linear-gradient(135deg, #0a2463 0%, #3e92cc 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(62, 146, 204, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Error = styled.div`
  color: #e53e3e;
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  animation: ${fadeIn} 0.3s ease-out;
  font-size: 0.95rem;
  width: 100%;
  max-width: 400px;
  
  &:empty {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 400px;
  
  span {
    color: #4a5568;
  }
`;

export const Link = styled.a`
  color: #3e92cc;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
  
  &:hover {
    color: #0a2463;
    text-decoration: underline;
  }
`;

// Update FeatureItem styles for better visibility
export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: "✦";
    margin-right: 1rem;
    color: #69f0ae;
    font-size: 1.4rem;
    text-shadow: 0 0 10px rgba(105, 240, 174, 0.5);
  }
  
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => 0.3 + props.index * 0.2}s;
  opacity: 0;
`;

export const IntroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  opacity: 0.9;
  max-width: 600px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

export const IntroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${breathe} 4s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;