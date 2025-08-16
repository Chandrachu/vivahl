import React, { useState } from 'react';
import styled from 'styled-components';
import { Sliders, Star, IndianRupee, Users, ChevronDown, ChevronUp } from 'lucide-react';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
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
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterContent = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const PriceRangeContainer = styled.div`
  margin-bottom: 1rem;
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.lightGray};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
    border: none;
  }
`;

const RatingFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RatingOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme.colors.text};

  &:hover {
    background: ${props => props.selected ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 0.1rem;
  color: ${props => props.selected ? 'white' : '#FFD700'};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const FilterChip = styled.div`
  background: ${props => props.selected ? props.theme.colors.primary : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.lightGray};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ClearFiltersButton = styled.button`
  background: none;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const AdvancedFilters = ({ filters, onFilterChange, category }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    rating: true,
    capacity: true,
    amenities: false,
    specialties: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      );
    }
    return stars;
  };

  const getCategorySpecificFilters = () => {
    switch (category) {
      case 'venues':
        return {
          amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'DJ', 'Valet', 'Photography', 'Power Backup'],
          specialties: ['Banquet Hall', 'Outdoor Lawn', 'Rooftop', 'Poolside', 'Beach', 'Garden', 'Heritage', 'Luxury']
        };
      case 'photography':
        return {
          amenities: ['Drone', 'Candid', 'Traditional', 'Pre-Wedding', 'Albums', 'Same Day Edit'],
          specialties: ['Wedding', 'Portrait', 'Candid', 'Traditional', 'Pre-Wedding', 'Maternity', 'Baby', 'Fashion']
        };
      case 'decorators':
        return {
          amenities: ['Lighting', 'Flowers', 'Draping', 'Mandap', 'Stage', 'Entrance', 'Centerpieces'],
          specialties: ['Floral', 'Traditional', 'Modern', 'Minimal', 'Luxury', 'Themed', 'Vintage', 'Rustic']
        };
      case 'catering':
        return {
          amenities: ['Live Counter', 'Buffet', 'Plated', 'Bar Service', 'Dessert Counter', 'Chaat Counter'],
          specialties: ['North Indian', 'South Indian', 'Chinese', 'Continental', 'Bengali', 'Gujarati', 'Punjabi', 'Rajasthani']
        };
      default:
        return {
          amenities: [],
          specialties: []
        };
    }
  };

  const categoryFilters = getCategorySpecificFilters();

  const clearAllFilters = () => {
    onFilterChange('priceRange', [0, 500000]);
    onFilterChange('rating', 0);
    onFilterChange('capacity', '');
    onFilterChange('amenities', []);
    onFilterChange('specialties', []);
  };

  return (
    <FiltersContainer>
      {/* Price Range Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('price')}>
          <FilterTitle>
            <IndianRupee size={20} />
            Price Range
          </FilterTitle>
          {openSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </FilterHeader>
        <FilterContent isOpen={openSections.price}>
          <PriceRangeContainer>
            <PriceInputs>
              <PriceInput
                type="number"
                placeholder="Min Price"
                value={filters.priceRange[0]}
                onChange={(e) => onFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              />
              <PriceInput
                type="number"
                placeholder="Max Price"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 500000])}
              />
            </PriceInputs>
            <RangeSlider
              type="range"
              min="0"
              max="500000"
              step="10000"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            />
          </PriceRangeContainer>
        </FilterContent>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('rating')}>
          <FilterTitle>
            <Star size={20} />
            Rating
          </FilterTitle>
          {openSections.rating ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </FilterHeader>
        <FilterContent isOpen={openSections.rating}>
          <RatingFilter>
            {[4.5, 4.0, 3.5, 3.0].map(rating => (
              <RatingOption
                key={rating}
                selected={filters.rating === rating}
                onClick={() => onFilterChange('rating', filters.rating === rating ? 0 : rating)}
              >
                <Stars selected={filters.rating === rating}>
                  {renderStars(Math.ceil(rating))}
                </Stars>
                <span>{rating}+ and above</span>
              </RatingOption>
            ))}
          </RatingFilter>
        </FilterContent>
      </FilterSection>

      {/* Capacity Filter */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('capacity')}>
          <FilterTitle>
            <Users size={20} />
            Capacity
          </FilterTitle>
          {openSections.capacity ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </FilterHeader>
        <FilterContent isOpen={openSections.capacity}>
          <FilterGrid>
            {['0-100', '100-300', '300-500', '500-1000', '1000+'].map(capacity => (
              <FilterChip
                key={capacity}
                selected={filters.capacity === capacity}
                onClick={() => onFilterChange('capacity', filters.capacity === capacity ? '' : capacity)}
              >
                {capacity} guests
              </FilterChip>
            ))}
          </FilterGrid>
        </FilterContent>
      </FilterSection>

      {/* Amenities Filter */}
      {categoryFilters.amenities.length > 0 && (
        <FilterSection>
          <FilterHeader onClick={() => toggleSection('amenities')}>
            <FilterTitle>
              <Sliders size={20} />
              Amenities
            </FilterTitle>
            {openSections.amenities ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </FilterHeader>
          <FilterContent isOpen={openSections.amenities}>
            <FilterGrid>
              {categoryFilters.amenities.map(amenity => (
                <FilterChip
                  key={amenity}
                  selected={filters.amenities?.includes(amenity)}
                  onClick={() => {
                    const current = filters.amenities || [];
                    const updated = current.includes(amenity)
                      ? current.filter(a => a !== amenity)
                      : [...current, amenity];
                    onFilterChange('amenities', updated);
                  }}
                >
                  {amenity}
                </FilterChip>
              ))}
            </FilterGrid>
          </FilterContent>
        </FilterSection>
      )}

      {/* Specialties Filter */}
      {categoryFilters.specialties.length > 0 && (
        <FilterSection>
          <FilterHeader onClick={() => toggleSection('specialties')}>
            <FilterTitle>
              <Star size={20} />
              Specialties
            </FilterTitle>
            {openSections.specialties ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </FilterHeader>
          <FilterContent isOpen={openSections.specialties}>
            <FilterGrid>
              {categoryFilters.specialties.map(specialty => (
                <FilterChip
                  key={specialty}
                  selected={filters.specialties?.includes(specialty)}
                  onClick={() => {
                    const current = filters.specialties || [];
                    const updated = current.includes(specialty)
                      ? current.filter(s => s !== specialty)
                      : [...current, specialty];
                    onFilterChange('specialties', updated);
                  }}
                >
                  {specialty}
                </FilterChip>
              ))}
            </FilterGrid>
          </FilterContent>
        </FilterSection>
      )}

      {/* Clear All Filters */}
      <ClearFiltersButton onClick={clearAllFilters}>
        Clear All Filters
      </ClearFiltersButton>
    </FiltersContainer>
  );
};

export default AdvancedFilters;
