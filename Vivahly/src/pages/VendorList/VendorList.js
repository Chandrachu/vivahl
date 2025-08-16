import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Filter, Grid, List, MapPin, Star } from 'lucide-react';
import VendorCard from '../../components/VendorCard/VendorCard';
import CityFilter from '../../components/Filters/CityFilter';
import CategoryFilter from '../../components/Filters/CategoryFilter';
import AdvancedFilters from '../../components/Filters/AdvancedFilters';
import SortingOptions from '../../components/Filters/SortingOptions';
import CategoryContent from '../../components/CategoryContent/CategoryContent';
import Breadcrumb from '../../components/UI/Breadcrumb';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const VendorListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const ResultsCount = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  max-width: 500px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 25px;
  font-size: 1rem;
  background: white;
  position: relative;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray};
  pointer-events: none;
`;

const ViewControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.gray};
  border: 2px solid ${props => props.theme.colors.lightGray};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const FilterButton = styled.button`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FiltersSection = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.showFilters ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 1000;
    padding: 2rem;
    overflow-y: auto;
  }
`;

const VendorsSection = styled.div`
  min-height: 400px;
`;

const VendorGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : '1fr'};
  gap: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.gray};

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const VendorList = ({ category: propCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { city, venueType } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: propCategory || searchParams.get('category') || '',
    city: city || searchParams.get('city') || '',
    venueType: venueType || '',
    priceRange: [0, 500000],
    rating: 0,
    capacity: '',
    amenities: [],
    specialties: [],
    sortBy: 'popular'
  });

  // Mock vendor data
  useEffect(() => {
    const mockVendors = [
      {
        id: 1,
        name: 'Royal Palace Banquet',
        category: 'Venue',
        type: 'Banquet Hall',
        location: 'Andheri, Mumbai',
        city: 'Mumbai',
        rating: 4.8,
        reviews: 124,
        startingPrice: 250000,
        capacity: '250-700 pax',
        rooms: 4,
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80',
        badges: ['handpicked', 'verified'],
        description: 'Luxury banquet hall with modern amenities',
        services: ['Full Service Catering', 'Decoration', 'Parking'],
        amenities: ['Parking', 'AC', 'Catering', 'Decoration', 'DJ', 'Valet'],
        specialties: ['Banquet Hall', 'Luxury', 'Heritage'],
        enquiriesLastWeek: 23,
        experienceYears: 15
      },
      {
        id: 2,
        name: 'Floral Dreams',
        category: 'Decorator',
        type: 'Decoration',
        location: 'Connaught Place, Delhi',
        city: 'Delhi',
        rating: 4.9,
        reviews: 89,
        startingPrice: 120000,
        capacity: 'All sizes',
        image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        badges: ['handpicked', 'users-choice'],
        description: 'Premium wedding decoration specialists',
        services: ['Floral Decoration', 'Mandap Setup', 'Lighting'],
        amenities: ['Lighting', 'Flowers', 'Draping', 'Mandap', 'Stage'],
        specialties: ['Floral', 'Traditional', 'Modern', 'Luxury'],
        enquiriesLastWeek: 18,
        experienceYears: 12
      },
      {
        id: 3,
        name: 'Perfect Shots Studio',
        category: 'Photography',
        type: 'Photo + Video',
        location: 'Koramangala, Bangalore',
        city: 'Bangalore',
        rating: 4.7,
        reviews: 156,
        startingPrice: 80000,
        capacity: 'Per day',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        badges: ['verified', 'users-choice'],
        description: 'Professional wedding photography and videography',
        services: ['Pre-wedding', 'Wedding Day', 'Post-wedding'],
        amenities: ['Drone', 'Candid', 'Traditional', 'Pre-Wedding', 'Albums'],
        specialties: ['Wedding', 'Candid', 'Traditional', 'Pre-Wedding'],
        enquiriesLastWeek: 31,
        albumSize: 500,
        experienceYears: 8
      },
      {
        id: 4,
        name: 'Elegant Makeovers',
        category: 'Makeup',
        type: 'Bridal Makeup',
        location: 'Baner, Pune',
        city: 'Pune',
        rating: 4.8,
        reviews: 76,
        startingPrice: 35000,
        capacity: 'Per session',
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        badges: ['handpicked'],
        description: 'Professional bridal makeup artist',
        services: ['Bridal Makeup', 'Family Makeup', 'Hair Styling']
      },
      {
        id: 5,
        name: 'Gourmet Delights',
        category: 'Catering',
        type: 'Full Service Catering',
        location: 'Hitech City, Hyderabad',
        city: 'Hyderabad',
        rating: 4.9,
        reviews: 134,
        startingPrice: 1500,
        capacity: '100-1000 pax',
        priceUnit: 'per plate',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        badges: ['handpicked', 'verified', 'users-choice'],
        description: 'Premium catering services with multi-cuisine options',
        services: ['Veg Menu', 'Non-Veg Menu', 'Live Counters'],
        amenities: ['Live Counter', 'Buffet', 'Plated', 'Bar Service', 'Dessert Counter'],
        specialties: ['North Indian', 'South Indian', 'Chinese', 'Continental'],
        cuisineTypes: ['North Indian', 'South Indian', 'Chinese', 'Continental', 'Bengali'],
        enquiriesLastWeek: 27,
        experienceYears: 20
      },
      {
        id: 6,
        name: 'Melodic Moments',
        category: 'Entertainment',
        type: 'DJ & Sound',
        location: 'T. Nagar, Chennai',
        city: 'Chennai',
        rating: 4.6,
        reviews: 92,
        startingPrice: 60000,
        capacity: 'Per event',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        badges: ['verified'],
        description: 'Professional DJ and sound services',
        services: ['DJ Services', 'Sound System', 'Live Music']
      },
      {
        id: 7,
        name: 'Dream Destination Weddings',
        category: 'Venue',
        type: 'Resort',
        location: 'Goa',
        city: 'Goa',
        rating: 4.9,
        reviews: 87,
        startingPrice: 450000,
        capacity: '100-400 pax',
        rooms: 25,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
        badges: ['handpicked', 'verified', 'users-choice'],
        description: 'Beachfront resort perfect for destination weddings',
        services: ['Accommodation', 'Catering', 'Decoration', 'Transportation'],
        amenities: ['Beach View', 'Swimming Pool', 'Spa', 'Multi-cuisine', 'Parking'],
        specialties: ['Destination Wedding', 'Beach Wedding', 'Luxury'],
        enquiriesLastWeek: 42,
        experienceYears: 18
      },
      {
        id: 8,
        name: 'Artistic Mehendi',
        category: 'Makeup',
        type: 'Mehendi Artist',
        location: 'Lajpat Nagar, Delhi',
        city: 'Delhi',
        rating: 4.7,
        reviews: 203,
        startingPrice: 15000,
        capacity: 'Per session',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        badges: ['handpicked', 'users-choice'],
        description: 'Traditional and modern mehendi designs',
        services: ['Bridal Mehendi', 'Family Mehendi', 'Arabic Designs'],
        amenities: ['Traditional', 'Arabic', 'Modern', 'Bridal', 'Party'],
        specialties: ['Traditional', 'Arabic', 'Bridal', 'Custom Designs'],
        enquiriesLastWeek: 38,
        experienceYears: 10
      },
      {
        id: 9,
        name: 'Luxury Wheels',
        category: 'Transportation',
        type: 'Wedding Cars',
        location: 'Sector 18, Noida',
        city: 'Delhi',
        rating: 4.5,
        reviews: 67,
        startingPrice: 25000,
        capacity: 'Per day',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        badges: ['verified'],
        description: 'Premium wedding car rentals and luxury transportation',
        services: ['Bridal Car', 'Guest Transportation', 'Airport Transfers'],
        amenities: ['AC', 'Decorated', 'Chauffeur', 'Premium', 'Luxury'],
        specialties: ['Luxury Cars', 'Vintage Cars', 'Decorated Cars'],
        enquiriesLastWeek: 15,
        experienceYears: 8
      }
    ];

    setTimeout(() => {
      setVendors(mockVendors);
      setLoading(false);
    }, 1000);
  }, []);

  const getCurrentCategory = () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('wedding-venues')) {
      return 'venues';
    } else if (currentPath.includes('wedding-photographers')) {
      return 'photography';
    } else if (currentPath.includes('wedding-decorators')) {
      return 'decorators';
    } else if (currentPath.includes('wedding-catering')) {
      return 'catering';
    }
    return filters.category || searchParams.get('category') || '';
  };

  const getPageTitle = () => {
    const currentPath = window.location.pathname;
    const category = filters.category || searchParams.get('category');
    
    // Handle WedMeGood-style URLs
    if (currentPath.includes('wedding-venues')) {
      return 'Wedding Venues';
    } else if (currentPath.includes('wedding-photographers')) {
      return 'Wedding Photographers';
    } else if (currentPath.includes('wedding-decorators')) {
      return 'Wedding Decorators';
    } else if (currentPath.includes('wedding-catering')) {
      return 'Wedding Catering';
    }
    
    if (category) {
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
    }
    return 'Wedding Vendors';
  };

  const filteredVendors = vendors.filter(vendor => {
    const currentPath = window.location.pathname;
    
    const matchesSearch = !filters.search || 
      vendor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      vendor.location.toLowerCase().includes(filters.search.toLowerCase());
    
    // Handle category filtering based on URL path
    let matchesCategory = true;
    if (currentPath.includes('wedding-venues')) {
      matchesCategory = vendor.category.toLowerCase() === 'venue';
    } else if (currentPath.includes('wedding-photographers')) {
      matchesCategory = vendor.category.toLowerCase() === 'photography';
    } else if (currentPath.includes('wedding-decorators')) {
      matchesCategory = vendor.category.toLowerCase() === 'decorator';
    } else if (currentPath.includes('wedding-catering')) {
      matchesCategory = vendor.category.toLowerCase() === 'catering';
    } else if (filters.category) {
      matchesCategory = vendor.category.toLowerCase() === filters.category.toLowerCase();
    }
    
    const matchesCity = !filters.city || 
      vendor.city.toLowerCase() === filters.city.toLowerCase();
    
    const matchesRating = vendor.rating >= filters.rating;
    
    const matchesPrice = vendor.startingPrice >= filters.priceRange[0] && 
      vendor.startingPrice <= filters.priceRange[1];
    
    // Capacity filtering
    const matchesCapacity = !filters.capacity || (() => {
      const capacity = filters.capacity;
      const vendorCapacity = vendor.capacity;
      if (capacity === '0-100') return vendorCapacity.includes('100') || vendorCapacity.includes('50');
      if (capacity === '100-300') return vendorCapacity.includes('250') || vendorCapacity.includes('300');
      if (capacity === '300-500') return vendorCapacity.includes('500') || vendorCapacity.includes('400');
      if (capacity === '500-1000') return vendorCapacity.includes('700') || vendorCapacity.includes('1000');
      if (capacity === '1000+') return vendorCapacity.includes('1000');
      return true;
    })();
    
    // Amenities filtering
    const matchesAmenities = !filters.amenities || filters.amenities.length === 0 || 
      filters.amenities.every(amenity => 
        vendor.services?.includes(amenity) || vendor.amenities?.includes(amenity)
      );
    
    // Specialties filtering
    const matchesSpecialties = !filters.specialties || filters.specialties.length === 0 || 
      filters.specialties.every(specialty => 
        vendor.services?.includes(specialty) || vendor.specialties?.includes(specialty)
      );
    
    return matchesSearch && matchesCategory && matchesCity && matchesRating && 
           matchesPrice && matchesCapacity && matchesAmenities && matchesSpecialties;
  }).sort((a, b) => {
    // Sorting logic
    switch (filters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.startingPrice - b.startingPrice;
      case 'price-high':
        return b.startingPrice - a.startingPrice;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'newest':
        return b.id - a.id; // Assuming higher ID means newer
      case 'popular':
      default:
        return (b.rating * b.reviews) - (a.rating * a.reviews); // Popularity score
    }
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <VendorListContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </VendorListContainer>
    );
  }

  return (
    <VendorListContainer>
      <Breadcrumb category={getCurrentCategory()} />
      <PageHeader>
        <PageTitle>{getPageTitle()}</PageTitle>
        <ResultsCount>
          Showing {filteredVendors.length} results as per your search criteria
        </ResultsCount>
      </PageHeader>

      <ControlsBar>
        <SearchSection>
          <div style={{ position: 'relative', flex: 1 }}>
            <SearchInput
              type="text"
              placeholder="Search vendors..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
          </div>
          <FilterButton onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} />
            Filters
          </FilterButton>
        </SearchSection>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SortingOptions 
            sortBy={filters.sortBy}
            onSortChange={(sortBy) => handleFilterChange('sortBy', sortBy)}
          />
          <ViewControls>
            <ViewButton 
              active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'} 
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </ViewButton>
          </ViewControls>
        </div>
      </ControlsBar>

      <MainContent>
        <FiltersSection showFilters={showFilters}>
          <CityFilter 
            selectedCity={filters.city}
            onCityChange={(city) => handleFilterChange('city', city)}
          />
          <CategoryFilter 
            selectedCategory={filters.category}
            onCategoryChange={(category) => handleFilterChange('category', category)}
          />
          <AdvancedFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            category={getCurrentCategory()}
          />
        </FiltersSection>

        <VendorsSection>
          {filteredVendors.length === 0 ? (
            <EmptyState>
              <h3>No vendors found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </EmptyState>
          ) : (
            <VendorGrid viewMode={viewMode}>
              {filteredVendors.map(vendor => (
                <VendorCard 
                  key={vendor.id} 
                  vendor={vendor} 
                  viewMode={viewMode}
                />
              ))}
            </VendorGrid>
          )}
        </VendorsSection>
      </MainContent>
      
      <CategoryContent 
        category={getCurrentCategory()} 
        vendorCount={filteredVendors.length}
      />
    </VendorListContainer>
  );
};

export default VendorList;
