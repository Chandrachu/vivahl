import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight, Home } from 'lucide-react';

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbLink = styled(Link)`
  color: ${props => props.theme.colors.gray};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CurrentPage = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Separator = styled.div`
  color: ${props => props.theme.colors.lightGray};
`;

const Breadcrumb = ({ category }) => {
  const getCategoryLabel = () => {
    const categoryMap = {
      'venues': 'Wedding Venues',
      'photography': 'Wedding Photographers',
      'decorators': 'Wedding Decorators',
      'catering': 'Wedding Catering',
      'makeup': 'Makeup Artists',
      'entertainment': 'Entertainment Services',
      'transportation': 'Transportation Services',
      'planners': 'Wedding Planners'
    };
    return categoryMap[category] || 'Wedding Vendors';
  };

  return (
    <BreadcrumbContainer>
      <BreadcrumbItem>
        <BreadcrumbLink to="/">
          <Home size={16} />
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      
      <Separator>
        <ChevronRight size={16} />
      </Separator>
      
      <BreadcrumbItem>
        <BreadcrumbLink to="/vendors">
          Vendors
        </BreadcrumbLink>
      </BreadcrumbItem>
      
      {category && (
        <>
          <Separator>
            <ChevronRight size={16} />
          </Separator>
          <BreadcrumbItem>
            <CurrentPage>{getCategoryLabel()}</CurrentPage>
          </BreadcrumbItem>
        </>
      )}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
