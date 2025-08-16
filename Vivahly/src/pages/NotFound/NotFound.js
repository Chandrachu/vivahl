import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const NotFoundEmoji = styled.div`
  font-size: 6rem;
  margin-bottom: 1rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const HomeButton = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundEmoji>🔍</NotFoundEmoji>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundText>
        The page you're looking for doesn't exist or has been moved.
      </NotFoundText>
      <HomeButton to="/">Go Back Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
