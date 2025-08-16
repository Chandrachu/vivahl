import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';

const FeaturedContainer = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`;

const FeaturedContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const VendorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const VendorCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const VendorImage = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const VendorInfo = styled.div`
  padding: 1.5rem;
`;

const VendorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const VendorTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const VendorCategory = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const VendorLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const VendorRating = styled.div`
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

const VendorPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const VendorActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.8rem 1.2rem;
  }

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

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.lightGray};
  }
`;

const FeaturedVendors = () => {
  const navigate = useNavigate();

  const vendors = [
    {
      id: 1,
      name: 'Royal Palace Banquet',
      category: 'Venue',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      reviews: 124,
      price: '₹2,50,000',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      featured: true
    },
    {
      id: 2,
      name: 'Floral Dreams',
      category: 'Decorator',
      location: 'Delhi, NCR',
      rating: 4.9,
      reviews: 89,
      price: '₹1,20,000',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      featured: true
    },
    {
      id: 3,
      name: 'Perfect Shots Studio',
      category: 'Photography',
      location: 'Bangalore, Karnataka',
      rating: 4.7,
      reviews: 156,
      price: '₹80,000',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      featured: true
    },
    {
      id: 4,
      name: 'Elegant Makeovers',
      category: 'Makeup Artist',
      location: 'Pune, Maharashtra',
      rating: 4.8,
      reviews: 76,
      price: '₹35,000',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80',
      featured: true
    },
    {
      id: 5,
      name: 'Melodic Moments',
      category: 'Entertainment',
      location: 'Chennai, Tamil Nadu',
      rating: 4.6,
      reviews: 92,
      price: '₹60,000',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      featured: true
    },
    {
      id: 6,
      name: 'Gourmet Delights',
      category: 'Catering',
      location: 'Hyderabad, Telangana',
      rating: 4.9,
      reviews: 134,
      price: '₹1,500/plate',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      featured: true
    }
  ];

  const handleVendorClick = (vendorId) => {
    navigate(`/vendor/${vendorId}`);
  };

  const handleWishlist = (e, vendorId) => {
    e.stopPropagation();
    // Add to wishlist logic
    console.log('Added to wishlist:', vendorId);
  };

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

  return (
    <FeaturedContainer>
      <FeaturedContent>
        <SectionTitle>Featured Vendors</SectionTitle>
        <VendorsGrid>
          {vendors.map((vendor, index) => (
            <VendorCard
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleVendorClick(vendor.id)}
            >
              <VendorImage>
                <img src={vendor.image} alt={vendor.name} />
              </VendorImage>
              
              <VendorInfo>
                <VendorHeader>
                  <div>
                    <VendorTitle>{vendor.name}</VendorTitle>
                    <VendorCategory>{vendor.category}</VendorCategory>
                  </div>
                  <WishlistButton onClick={(e) => handleWishlist(e, vendor.id)}>
                    <Heart size={20} />
                  </WishlistButton>
                </VendorHeader>
                
                <VendorLocation>
                  <MapPin size={16} />
                  <span>{vendor.location}</span>
                </VendorLocation>
                
                <VendorRating>
                  <Stars>
                    {renderStars(vendor.rating)}
                  </Stars>
                  <RatingText>
                    {vendor.rating} ({vendor.reviews} reviews)
                  </RatingText>
                </VendorRating>
                
                <VendorPrice>
                  Starting from {vendor.price}
                </VendorPrice>
                
                <VendorActions>
                  <ActionButton primary>
                    View Details
                  </ActionButton>
                  <ActionButton>
                    Contact
                  </ActionButton>
                </VendorActions>
              </VendorInfo>
            </VendorCard>
          ))}
        </VendorsGrid>
      </FeaturedContent>
    </FeaturedContainer>
  );
};

export default FeaturedVendors;
