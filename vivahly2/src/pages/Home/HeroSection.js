import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const HeroContainer = styled.section`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 80px 0 60px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const HeroButton = styled.button`
  background: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.primary : 'white'};
  border: 2px solid white;
  padding: 16px 32px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 300px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    background: ${props => props.primary ? 'rgba(255, 255, 255, 0.9)' : 'white'};
    color: ${props => props.theme.colors.primary};
  }
`;

const HeroStats = styled(motion.div)`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Stat = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.accent};
  }
  
  p {
    opacity: 0.9;
  }
`;

const HeroDecoration = styled.div`
  position: absolute;
  font-size: 120px;
  opacity: 0.1;
  z-index: 1;
  
  &.ring1 {
    top: 20%;
    left: 10%;
    animation: float 6s ease-in-out infinite;
  }
  
  &.ring2 {
    top: 60%;
    right: 15%;
    animation: float 6s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const UserGreeting = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 25px;
  margin-bottom: 2rem;
  display: inline-block;
  backdrop-filter: blur(10px);
`;

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/vendors');
    } else {
      navigate('/register');
    }
  };

  const handleExplore = () => {
    navigate('/vendors');
  };

  return (
    <HeroContainer>
      <HeroDecoration className="ring1">💍</HeroDecoration>
      <HeroDecoration className="ring2">💐</HeroDecoration>
      
      <HeroContent>
        {user && (
          <UserGreeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, {user.name}! 
            {user.weddingDate && (
              <span> Your big day is approaching! 🎉</span>
            )}
          </UserGreeting>
        )}
        
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Perfect Wedding
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connect with the best vendors, venues, and services for your special day
        </HeroSubtitle>
        
        <HeroButtons
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HeroButton primary onClick={handleGetStarted}>
            {user ? 'Find Vendors' : 'Get Started'}
          </HeroButton>
          <HeroButton onClick={handleExplore}>
            Explore Venues
          </HeroButton>
        </HeroButtons>
        
        <HeroStats
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Stat>
            <h3>10,000+</h3>
            <p>Verified Vendors</p>
          </Stat>
          <Stat>
            <h3>5,000+</h3>
            <p>Happy Couples</p>
          </Stat>
          <Stat>
            <h3>50+</h3>
            <p>Cities Covered</p>
          </Stat>
        </HeroStats>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
