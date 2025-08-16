import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Star, MapPin, Users, Heart, Phone, Mail } from 'lucide-react';

const CardContainer = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
    border-color: ${props => props.theme.colors.primary};
  }

  ${props => props.viewMode === 'list' && `
    display: flex;
    flex-direction: row;
    
    @media (max-width: ${props.theme.breakpoints.mobile}) {
      flex-direction: column;
    }
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  height: ${props => props.viewMode === 'list' ? '200px' : '220px'};
  width: ${props => props.viewMode === 'list' ? '300px' : '100%'};
  background: linear-gradient(45deg, #8B4513, #CD853F);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 200px;
  }
`;

const VendorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BadgesContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Badge = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'handpicked': return props.theme.colors.primary;
      case 'verified': return props.theme.colors.success;
      case 'users-choice': return props.theme.colors.warning;
      default: return props.theme.colors.gray;
    }
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

const VendorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const VendorInfo = styled.div`
  flex: 1;
`;

const VendorName = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const VendorType = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
  color: #FFD700;
`;

const RatingText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
`;

const PriceContainer = styled.div`
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.2rem;
`;

const CapacityInfo = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
`;

const ServicesContainer = styled.div`
  margin-bottom: 1rem;
`;

const ServiceTag = styled.span`
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.primary};
    color: white;
  }
`;

const WishlistButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.lightGray};
  }
`;

const HighDemandBadge = styled.div`
  background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.5rem;
  display: inline-block;
`;

const VendorCard = ({ vendor, viewMode = 'grid' }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="currentColor" style={{ opacity: 0.5 }} />);
    }

    return stars;
  };

  const formatPrice = (price, unit = '') => {
    if (price < 1000) {
      return `₹${price}${unit}`;
    } else if (price < 100000) {
      return `₹${(price / 1000).toFixed(0)}K${unit}`;
    } else {
      return `₹${(price / 100000).toFixed(1)}L${unit}`;
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Add to wishlist logic
    console.log('Added to wishlist:', vendor.id);
  };

  const handleContact = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Contact vendor logic
    console.log('Contact vendor:', vendor.id);
  };

  const getCategorySpecificInfo = () => {
    switch (vendor.category.toLowerCase()) {
      case 'venue':
        return {
          icon: '🏛️',
          priceLabel: vendor.priceUnit ? `${formatPrice(vendor.startingPrice)} ${vendor.priceUnit}` : `Starting from ${formatPrice(vendor.startingPrice)}`,
          additionalInfo: vendor.rooms ? `${vendor.rooms} Rooms` : null,
          specialties: vendor.amenities || []
        };
      case 'photography':
        return {
          icon: '📸',
          priceLabel: `${formatPrice(vendor.startingPrice)} per day`,
          additionalInfo: vendor.albumSize ? `${vendor.albumSize} Photos` : null,
          specialties: vendor.styles || []
        };
      case 'decorator':
        return {
          icon: '🌸',
          priceLabel: `${formatPrice(vendor.startingPrice)} onwards`,
          additionalInfo: vendor.experienceYears ? `${vendor.experienceYears} Years Exp` : null,
          specialties: vendor.decorationTypes || []
        };
      case 'catering':
        return {
          icon: '🍰',
          priceLabel: vendor.priceUnit === 'per plate' ? `${formatPrice(vendor.startingPrice)} per plate` : `Starting from ${formatPrice(vendor.startingPrice)}`,
          additionalInfo: vendor.cuisineTypes ? `${vendor.cuisineTypes.length} Cuisines` : null,
          specialties: vendor.cuisineTypes || []
        };
      default:
        return {
          icon: '🔧',
          priceLabel: `Starting from ${formatPrice(vendor.startingPrice)}`,
          additionalInfo: null,
          specialties: []
        };
    }
  };

  const categoryInfo = getCategorySpecificInfo();

  return (
    <Link to={`/vendor/${vendor.id}`} style={{ textDecoration: 'none' }}>
      <CardContainer viewMode={viewMode}>
        <ImageContainer viewMode={viewMode}>
          {vendor.image ? (
            <VendorImage src={vendor.image} alt={vendor.name} />
          ) : (
            <div style={{ fontSize: '3rem' }}>
              {categoryInfo.icon}
            </div>
          )}
          
          <BadgesContainer>
            {vendor.badges?.map((badge, index) => (
              <Badge key={index} type={badge}>
                {badge === 'handpicked' && 'Handpicked'}
                {badge === 'verified' && 'Verified'}
                {badge === 'users-choice' && 'Users Choice'}
              </Badge>
            ))}
          </BadgesContainer>
        </ImageContainer>

        <CardContent>
          <VendorHeader>
            <VendorInfo>
              <VendorName>{vendor.name}</VendorName>
              <VendorType>{vendor.type}</VendorType>
            </VendorInfo>
            <WishlistButton onClick={handleWishlist}>
              <Heart size={20} />
            </WishlistButton>
          </VendorHeader>

          <LocationContainer>
            <MapPin size={16} />
            <span>{vendor.location}</span>
          </LocationContainer>

          <RatingContainer>
            <Stars>
              {renderStars(vendor.rating)}
            </Stars>
            <RatingText>
              {vendor.rating} ({vendor.reviews} reviews)
            </RatingText>
          </RatingContainer>

          <PriceContainer>
            <Price>{categoryInfo.priceLabel}</Price>
            <CapacityInfo>
              <Users size={14} style={{ marginRight: '0.3rem' }} />
              {vendor.capacity}
              {categoryInfo.additionalInfo && (
                <span style={{ marginLeft: '0.5rem' }}>• {categoryInfo.additionalInfo}</span>
              )}
            </CapacityInfo>
          </PriceContainer>

          {(vendor.services && vendor.services.length > 0) || (categoryInfo.specialties && categoryInfo.specialties.length > 0) && (
            <ServicesContainer>
              {(vendor.services || categoryInfo.specialties).slice(0, 3).map((service, index) => (
                <ServiceTag key={index}>{service}</ServiceTag>
              ))}
              {(vendor.services || categoryInfo.specialties).length > 3 && (
                <ServiceTag>+{(vendor.services || categoryInfo.specialties).length - 3} more</ServiceTag>
              )}
            </ServicesContainer>
          )}

          {vendor.reviews > 50 && (
            <HighDemandBadge>
              In High Demand • {vendor.enquiriesLastWeek || Math.floor(vendor.reviews / 10)} enquiries last week
            </HighDemandBadge>
          )}

          <ActionsContainer>
            <ActionButton primary>
              View Details
            </ActionButton>
            <ActionButton onClick={handleContact}>
              <Phone size={16} />
              Contact
            </ActionButton>
          </ActionsContainer>
        </CardContent>
      </CardContainer>
    </Link>
  );
};

export default VendorCard;
