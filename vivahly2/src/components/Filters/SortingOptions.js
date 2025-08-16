import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const SortContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SortButton = styled.button`
  background: white;
  border: 2px solid ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.heavy};
  min-width: 200px;
  z-index: 1000;
  margin-top: 0.5rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
`;

const SortOption = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.text};
  background: ${props => props.selected ? `${props.theme.colors.primary}15` : 'transparent'};

  &:hover {
    background: ${props => props.selected ? `${props.theme.colors.primary}25` : props.theme.colors.lightGray};
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const SortLabel = styled.span`
  font-weight: ${props => props.selected ? '600' : '400'};
`;

const CheckMark = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const SortingOptions = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'popular', label: 'Popularity', description: 'Most popular vendors first' },
    { value: 'rating', label: 'Rating', description: 'Highest rated first' },
    { value: 'price-low', label: 'Price: Low to High', description: 'Cheapest first' },
    { value: 'price-high', label: 'Price: High to Low', description: 'Most expensive first' },
    { value: 'reviews', label: 'Most Reviews', description: 'Most reviewed first' },
    { value: 'newest', label: 'Newest', description: 'Recently added first' }
  ];

  const getCurrentSortLabel = () => {
    const current = sortOptions.find(option => option.value === sortBy);
    return current ? current.label : 'Sort by';
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <SortContainer>
      <SortButton onClick={() => setIsOpen(!isOpen)}>
        <ArrowUpDown size={16} />
        {getCurrentSortLabel()}
        <ChevronDown size={16} />
      </SortButton>
      
      <SortDropdown isOpen={isOpen}>
        {sortOptions.map(option => (
          <SortOption
            key={option.value}
            selected={sortBy === option.value}
            onClick={() => handleSortSelect(option.value)}
          >
            <div>
              <SortLabel selected={sortBy === option.value}>
                {option.label}
              </SortLabel>
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.2rem' }}>
                {option.description}
              </div>
            </div>
            {sortBy === option.value && <CheckMark>✓</CheckMark>}
          </SortOption>
        ))}
      </SortDropdown>
    </SortContainer>
  );
};

export default SortingOptions;
