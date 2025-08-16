import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, MapPin } from 'lucide-react';

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 200px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 14px;
    padding: 10px 12px 10px 36px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray};
  pointer-events: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: 12px;
  }
`;

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.heavy};
  z-index: 1000;
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
`;

const SuggestionItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const mockSuggestions = [
    { type: 'vendor', name: 'Royal Palace Banquet', location: 'Mumbai', category: 'Venue' },
    { type: 'vendor', name: 'Floral Dreams', location: 'Delhi', category: 'Decorator' },
    { type: 'vendor', name: 'Perfect Shots Studio', location: 'Bangalore', category: 'Photography' },
    { type: 'category', name: 'Wedding Photographers', icon: '📸' },
    { type: 'category', name: 'Bridal Makeup', icon: '💄' },
    { type: 'location', name: 'Mumbai Venues', icon: '🏛️' },
  ];

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/vendors?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    
    if (suggestion.type === 'vendor') {
      navigate(`/vendors?search=${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'category') {
      navigate(`/vendors?category=${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'location') {
      navigate(`/vendors?location=${encodeURIComponent(suggestion.name)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search vendors, venues..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => query && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      <SearchIcon>
        <Search size={20} />
      </SearchIcon>
      
      <SearchSuggestions isOpen={showSuggestions && suggestions.length > 0}>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem 
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.type === 'vendor' && <MapPin size={16} />}
            {suggestion.type === 'category' && <span>{suggestion.icon}</span>}
            {suggestion.type === 'location' && <span>{suggestion.icon}</span>}
            
            <div>
              <div>{suggestion.name}</div>
              {suggestion.location && (
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {suggestion.category} • {suggestion.location}
                </div>
              )}
            </div>
          </SuggestionItem>
        ))}
      </SearchSuggestions>
    </SearchContainer>
  );
};

export default SearchBar;
