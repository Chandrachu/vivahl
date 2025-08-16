import React, { useState } from 'react';
import styled from 'styled-components';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const FilterContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${props => props.theme.shadows.light};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PopularCities = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CityCard = styled.div`
  background: ${props => props.selected ? props.theme.colors.primary : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.lightGray};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(205, 133, 63, 0.1) 100%);
    opacity: ${props => props.selected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const CityIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

const CityName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

const AllCitiesContainer = styled.div`
  max-height: ${props => props.isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const CityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  padding-top: 1rem;
`;

const CityOption = styled.div`
  padding: 0.5rem 1rem;
  background: ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme.colors.text};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-align: center;

  &:hover {
    background: ${props => props.selected ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
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

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const CityFilter = ({ selectedCity, onCityChange }) => {
  const [isAllCitiesOpen, setIsAllCitiesOpen] = useState(false);

  const popularCities = [
    { name: 'Mumbai', icon: '🏢' },
    { name: 'Delhi', icon: '🏛️' },
    { name: 'Bangalore', icon: '🌆' },
    { name: 'Chennai', icon: '🏖️' },
    { name: 'Hyderabad', icon: '🏰' },
    { name: 'Pune', icon: '🎓' },
    { name: 'Kolkata', icon: '🎨' },
    { name: 'Jaipur', icon: '👑' },
    { name: 'Goa', icon: '🏝️' },
    { name: 'Lucknow', icon: '🕌' }
  ];

  const allCities = [
    'Agra', 'Ahmedabad', 'Amritsar', 'Aurangabad', 'Bhopal', 'Bhubaneswar',
    'Chandigarh', 'Coimbatore', 'Dehradun', 'Faridabad', 'Ghaziabad', 'Gurgaon',
    'Guwahati', 'Indore', 'Jaipur', 'Jodhpur', 'Kochi', 'Ludhiana', 'Madurai',
    'Mangalore', 'Meerut', 'Mysore', 'Nagpur', 'Nashik', 'Noida', 'Patna',
    'Rajkot', 'Ranchi', 'Shimla', 'Surat', 'Thiruvananthapuram', 'Udaipur',
    'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam'
  ];

  const handleCitySelect = (city) => {
    onCityChange(city === selectedCity ? '' : city);
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>
          <MapPin size={20} />
          Filter by City
        </FilterTitle>
        {selectedCity && (
          <ClearButton onClick={() => onCityChange('')}>
            Clear
          </ClearButton>
        )}
      </FilterHeader>

      <PopularCities>
        {popularCities.map((city) => (
          <CityCard
            key={city.name}
            selected={selectedCity === city.name}
            onClick={() => handleCitySelect(city.name)}
          >
            <CityIcon>{city.icon}</CityIcon>
            <CityName>{city.name}</CityName>
          </CityCard>
        ))}
      </PopularCities>

      <FilterHeader onClick={() => setIsAllCitiesOpen(!isAllCitiesOpen)}>
        <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>
          +{allCities.length} more cities
        </span>
        {isAllCitiesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </FilterHeader>

      <AllCitiesContainer isOpen={isAllCitiesOpen}>
        <CityList>
          {allCities.map((city) => (
            <CityOption
              key={city}
              selected={selectedCity === city}
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </CityOption>
          ))}
        </CityList>
      </AllCitiesContainer>
    </FilterContainer>
  );
};

export default CityFilter;
