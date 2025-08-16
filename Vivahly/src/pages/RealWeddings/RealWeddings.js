import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RealWeddingsContainer = styled.div`
  min-height: 100vh;
  padding: 80px 20px 40px;
  background: ${props => props.theme.colors.background};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const WeddingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const WeddingCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const WeddingImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const WeddingContent = styled.div`
  padding: 20px;
`;

const WeddingCouple = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin: 0 0 10px;
  font-size: 1.4rem;
`;

const WeddingLocation = styled.p`
  color: ${props => props.theme.colors.gray};
  margin: 0 0 10px;
  font-weight: 600;
`;

const WeddingCulture = styled.span`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const WeddingType = styled.span`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 10px;
`;

const TagContainer = styled.div`
  margin-top: 15px;
`;

const RealWeddings = () => {
  const { city, culture, id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [weddings, setWeddings] = useState([]);

  const filterCategories = [
    { key: 'all', label: 'All Weddings' },
    { key: 'destination-weddings', label: 'Destination Weddings' },
    { key: 'grand-luxurious-weddings', label: 'Grand Luxurious Weddings' },
    { key: 'pocket-friendly-stunners-weddings', label: 'Budget Friendly' },
    { key: 'intimate-minimalist-weddings', label: 'Intimate Minimalist' },
    { key: 'modern-stylish-weddings', label: 'Modern Stylish' },
    { key: 'international-weddings', label: 'International Weddings' }
  ];

  const cultureCategories = [
    { key: 'maharashtrian', label: 'Maharashtrian' },
    { key: 'punjabi-sikh', label: 'Punjabi Sikh' },
    { key: 'bengali', label: 'Bengali' },
    { key: 'gujarati', label: 'Gujarati' },
    { key: 'marwari', label: 'Marwari' },
    { key: 'telugu', label: 'Telugu' },
    { key: 'tamil', label: 'Tamil' },
    { key: 'malayali', label: 'Malayali' },
    { key: 'sindhi', label: 'Sindhi' },
    { key: 'cross-culture', label: 'Cross Culture' }
  ];

  // Sample wedding data
  const sampleWeddings = [
    {
      id: 1,
      couple: "Sanjana and Gowtham",
      location: "Hyderabad",
      culture: "telugu",
      type: "grand-luxurious-weddings",
      image: "/api/placeholder/350/250",
      slug: "sanjana-and-gowtham-hyderabad-telugu-wedding-4622"
    },
    {
      id: 2,
      couple: "Amala and Aditya",
      location: "Jodhpur",
      culture: "punjabi-sikh",
      type: "destination-weddings",
      image: "/api/placeholder/350/250",
      slug: "amala-and-aditya-jodhpur-punjabi-sikh-wedding-4618"
    },
    {
      id: 3,
      couple: "Shippee and Maheep",
      location: "Udaipur",
      culture: "punjabi-sikh",
      type: "destination-weddings",
      image: "/api/placeholder/350/250",
      slug: "shippee-and-maheep-udaipur-punjabi-sikh-wedding-4617"
    },
    {
      id: 4,
      couple: "Savera and Ishaan",
      location: "Delhi NCR",
      culture: "punjabi-sikh",
      type: "modern-stylish-weddings",
      image: "/api/placeholder/350/250",
      slug: "savera-and-ishaan-delhi-ncr-punjabi-sikh-wedding-4481"
    },
    {
      id: 5,
      couple: "Raika and Sagar",
      location: "Bahrain",
      culture: "punjabi-sikh",
      type: "international-weddings",
      image: "/api/placeholder/350/250",
      slug: "raika-and-sagar-bahrain-punjabi-sikh-wedding-4405"
    },
    {
      id: 6,
      couple: "Avantika and Divyamm",
      location: "Jaipur",
      culture: "cross-culture",
      type: "destination-weddings",
      image: "/api/placeholder/350/250",
      slug: "avantika-and-divyamm-jaipur-cross-culture-wedding-4489"
    },
    {
      id: 7,
      couple: "Anukrit and Shubham",
      location: "Udaipur",
      culture: "punjabi-sikh",
      type: "destination-weddings",
      image: "/api/placeholder/350/250",
      slug: "anukrit-and-shubham-udaipur-punjabi-sikh-wedding-4296"
    },
    {
      id: 8,
      couple: "Pulkit Samrat and Kriti Kharbanda",
      location: "Delhi NCR",
      culture: "punjabi-sikh",
      type: "grand-luxurious-weddings",
      image: "/api/placeholder/350/250",
      slug: "pulkit-samrat-and-kriti-kharbanda-delhi-ncr-wedding-4221"
    },
    {
      id: 9,
      couple: "Shivani and Kerman",
      location: "Thailand",
      culture: "punjabi-sikh",
      type: "international-weddings",
      image: "/api/placeholder/350/250",
      slug: "shivani-and-kerman-thailand-punjabi-sikh-wedding-4448"
    },
    {
      id: 10,
      couple: "Saanya and Rahul",
      location: "Mumbai",
      culture: "punjabi-sikh",
      type: "modern-stylish-weddings",
      image: "/api/placeholder/350/250",
      slug: "saanya-and-rahul-mumbai-punjabi-sikh-wedding-4231"
    },
    {
      id: 11,
      couple: "Gayatri and Aditya",
      location: "Jaipur",
      culture: "punjabi-sikh",
      type: "destination-weddings",
      image: "/api/placeholder/350/250",
      slug: "gayatri-and-aditya-jaipur-punjabi-sikh-wedding-4314"
    },
    {
      id: 12,
      couple: "Shubhangi and Mayank",
      location: "Gurgaon",
      culture: "punjabi-sikh",
      type: "intimate-minimalist-weddings",
      image: "/api/placeholder/350/250",
      slug: "shubhangi-and-mayank-gurgaon-wedding-4456"
    }
  ];

  useEffect(() => {
    setWeddings(sampleWeddings);
  }, []);

  const filteredWeddings = selectedFilter === 'all' 
    ? weddings 
    : weddings.filter(wedding => wedding.type === selectedFilter);

  const getCultureLabel = (culture) => {
    const found = cultureCategories.find(cat => cat.key === culture);
    return found ? found.label : culture;
  };

  const getTypeLabel = (type) => {
    const found = filterCategories.find(cat => cat.key === type);
    return found ? found.label : type;
  };

  return (
    <RealWeddingsContainer>
      <Header>
        <Title>Real Weddings</Title>
        <Subtitle>
          Get inspired by real couples and their beautiful wedding stories
        </Subtitle>
      </Header>

      <FilterSection>
        {filterCategories.map(category => (
          <FilterButton
            key={category.key}
            active={selectedFilter === category.key}
            onClick={() => setSelectedFilter(category.key)}
          >
            {category.label}
          </FilterButton>
        ))}
      </FilterSection>

      <WeddingGrid>
        {filteredWeddings.map((wedding, index) => (
          <WeddingCard
            key={wedding.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <WeddingImage src={wedding.image} alt={wedding.couple} />
            <WeddingContent>
              <WeddingCouple>{wedding.couple}</WeddingCouple>
              <WeddingLocation>{wedding.location}</WeddingLocation>
              <TagContainer>
                <WeddingCulture>{getCultureLabel(wedding.culture)}</WeddingCulture>
                <WeddingType>{getTypeLabel(wedding.type)}</WeddingType>
              </TagContainer>
            </WeddingContent>
          </WeddingCard>
        ))}
      </WeddingGrid>
    </RealWeddingsContainer>
  );
};

export default RealWeddings;
