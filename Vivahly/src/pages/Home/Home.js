import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import HeroSection from './HeroSection';
import FeaturedVendors from './FeaturedVendors';
import Categories from './Categories';
import Testimonials from './Testimonials';
import AIRecommendations from './AIRecommendations';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HeroSection />
      {user && <AIRecommendations />}
      <Categories />
      <FeaturedVendors />
      <Testimonials />
    </HomeContainer>
  );
};

export default Home;
