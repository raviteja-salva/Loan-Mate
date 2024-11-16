import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
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

export const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
`;

export const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
  border-radius: 20px;
  padding: 2.5rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  animation: ${scaleUp} 0.5s ease-out;

  h1 {
    font-size: 2.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255,255,255, 0) 0%,
        rgba(255,255,255, 0.2) 50%,
        rgba(255,255,255, 0) 100%
      );
      animation: ${shimmer} 1.5s infinite;
    }
  }
`;

export const MetricSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  box-shadow: 0 4px 12px ${props => `${props.bgColor}40`};
`;

export const MetricInfo = styled.div`
  flex: 1;
`;

export const MetricLabel = styled.h3`
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

export const MetricValue = styled.p`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
`;

export const Section = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  animation: ${scaleUp} 0.5s ease-out;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  margin-bottom: 1.5rem;
  color: #1e293b;
  font-size: 1.5rem;
`;

export const ChartSection = styled(Section)`
  height: 400px;
`;

export const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
