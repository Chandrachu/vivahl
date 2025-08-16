import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const AIContainer = styled.section`
  background: linear-gradient(135deg, #8B4513 10%, #CD853F 90%);
  padding: 60px 0;
  position: relative;
  overflow: hidden;
`;

const AIContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const AICard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const AIIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8B4513, #CD853F);
  border-radius: 50%;
  margin-bottom: 1rem;
  color: white;
`;

const AITitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const AIDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const RecommendationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const RecommendationCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const RecommendationIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const RecommendationTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const RecommendationDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RecommendationButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ViewAllButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  z-index: 1;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 2px, transparent 2px),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 2px, transparent 2px);
  background-size: 50px 50px;
`;

const AIRecommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      icon: '🏛️',
      title: 'Royal Palace Banquet',
      description: 'Perfect for your rustic theme preference',
      action: 'View Venue',
      vendorId: 1
    },
    {
      icon: '🌸',
      title: 'Floral Dreams',
      description: 'Matches your décor style perfectly',
      action: 'View Decorator',
      vendorId: 2
    },
    {
      icon: '📸',
      title: 'Perfect Shots Studio',
      description: 'Specializes in outdoor photography',
      action: 'View Portfolio',
      vendorId: 3
    }
  ];

  const handleRecommendationClick = (vendorId) => {
    navigate(`/vendor/${vendorId}`);
  };

  const handleViewAll = () => {
    navigate('/vendors?recommended=true');
  };

  return (
    <AIContainer>
      <BackgroundPattern />
      <AIContent>
        <AICard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AIIcon>
            <Sparkles size={28} />
          </AIIcon>
          
          <AITitle>AI-Powered Recommendations</AITitle>
          <AIDescription>
            Based on your preferences and wedding theme, we've curated personalized 
            vendor recommendations just for you.
          </AIDescription>
          
          <RecommendationGrid>
            {recommendations.map((rec, index) => (
              <RecommendationCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleRecommendationClick(rec.vendorId)}
              >
                <RecommendationIcon>{rec.icon}</RecommendationIcon>
                <RecommendationTitle>{rec.title}</RecommendationTitle>
                <RecommendationDescription>{rec.description}</RecommendationDescription>
                <RecommendationButton>
                  {rec.action}
                  <ArrowRight size={14} />
                </RecommendationButton>
              </RecommendationCard>
            ))}
          </RecommendationGrid>
          
          <ViewAllButton onClick={handleViewAll}>
            View All Recommendations
            <ArrowRight size={20} />
          </ViewAllButton>
        </AICard>
      </AIContent>
    </AIContainer>
  );
};

export default AIRecommendations;
