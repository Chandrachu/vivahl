import React from 'react';
import styled from 'styled-components';
import { Filter } from 'lucide-react';

const FilterContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${props => props.theme.shadows.light};
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const CategoryCard = styled.div`
  background: ${props => props.selected ? props.theme.colors.primary : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.lightGray};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CategoryName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-left: auto;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { name: 'venues', label: 'Venues', icon: '🏛️' },
    { name: 'photography', label: 'Photography', icon: '📸' },
    { name: 'decorators', label: 'Decorators', icon: '🌸' },
    { name: 'catering', label: 'Catering', icon: '🍰' },
    { name: 'makeup', label: 'Makeup', icon: '💄' },
    { name: 'entertainment', label: 'Entertainment', icon: '🎵' },
    { name: 'transportation', label: 'Transportation', icon: '🚗' },
    { name: 'planners', label: 'Planners', icon: '📋' }
  ];

  const handleCategorySelect = (category) => {
    onCategoryChange(category === selectedCategory ? '' : category);
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>
          <Filter size={20} />
          Filter by Category
        </FilterTitle>
        {selectedCategory && (
          <ClearButton onClick={() => onCategoryChange('')}>
            Clear
          </ClearButton>
        )}
      </FilterHeader>

      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            selected={selectedCategory === category.name}
            onClick={() => handleCategorySelect(category.name)}
          >
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryName>{category.label}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </FilterContainer>
  );
};

export default CategoryFilter;
