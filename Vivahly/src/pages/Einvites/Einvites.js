import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Download, Share2, Edit, Eye, Heart, Star } from 'lucide-react';

const EinvitesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.gray};
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const InvitesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InviteCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const InviteImage = styled.div`
  height: 300px;
  background: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

const InviteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${InviteCard}:hover & {
    opacity: 1;
  }
`;

const InviteActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const InviteInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const InviteStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${props => props.theme.colors.gray};
  font-size: 0.8rem;
`;

const PriceTag = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const UseTemplateButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Einvites = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'wedding-card-designs', name: 'Wedding Card Designs' },
    { id: 'video-templates', name: 'Video Templates' },
    { id: 'save-the-date-templates', name: 'Save The Date' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'modern', name: 'Modern' },
    { id: 'floral', name: 'Floral' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'luxury', name: 'Luxury' }
  ];

  const inviteTemplates = [
    {
      id: 1,
      name: 'Fountain Chandelier Caricature Theme',
      description: 'Elegant design with fountain and chandelier elements',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: 'Free',
      downloads: 1250,
      likes: 456,
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: 'Bells Swan Fort Theme',
      description: 'Traditional fort design with swan and bells',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹199',
      downloads: 890,
      likes: 324,
      rating: 4.6,
      featured: false
    },
    {
      id: 3,
      name: 'Umbrella Palace Caricature Theme',
      description: 'Colorful umbrella theme with palace background',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹299',
      downloads: 567,
      likes: 234,
      rating: 4.9,
      featured: true
    },
    {
      id: 4,
      name: 'Pink Curtain Parrot Theme',
      description: 'Vibrant pink design with parrot motifs',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹149',
      downloads: 1120,
      likes: 678,
      rating: 4.7,
      featured: false
    },
    {
      id: 5,
      name: 'Animated Wedding Video Template',
      description: 'Beautiful animated invitation with music',
      category: 'video-templates',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹599',
      downloads: 743,
      likes: 291,
      rating: 4.5,
      featured: false
    },
    {
      id: 6,
      name: 'Cinematic Video Invitation',
      description: 'Movie-style video invitation template',
      category: 'video-templates',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹799',
      downloads: 892,
      likes: 445,
      rating: 4.8,
      featured: true
    },
    {
      id: 7,
      name: 'Elegant Save The Date',
      description: 'Perfect for save the date announcements',
      category: 'save-the-date-templates',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: 'Free',
      downloads: 1567,
      likes: 789,
      rating: 4.9,
      featured: false
    },
    {
      id: 8,
      name: 'Modern Save The Date',
      description: 'Contemporary save the date design',
      category: 'save-the-date-templates',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
      price: '₹199',
      downloads: 654,
      likes: 312,
      rating: 4.6,
      featured: false
    },
    {
      id: 9,
      name: '3D Fort Ganeshji Theme',
      description: 'Traditional 3D fort design with Ganesh elements',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹399',
      downloads: 987,
      likes: 456,
      rating: 4.4,
      featured: false
    },
    {
      id: 10,
      name: 'Caricature Horse Fort Theme',
      description: 'Royal horse theme with fort background',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹249',
      downloads: 567,
      likes: 234,
      rating: 4.7,
      featured: true
    },
    {
      id: 2,
      name: 'Minimalist Elegance',
      description: 'Clean and modern design with subtle florals',
      category: 'minimalist',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹199',
      downloads: 890,
      likes: 324,
      rating: 4.6,
      featured: false
    },
    {
      id: 3,
      name: 'Royal Luxury',
      description: 'Opulent design with rich colors and patterns',
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹299',
      downloads: 567,
      likes: 234,
      rating: 4.9,
      featured: true
    },
    {
      id: 4,
      name: 'Floral Dreams',
      description: 'Beautiful botanical design with watercolor flowers',
      category: 'floral',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹149',
      downloads: 1120,
      likes: 678,
      rating: 4.7,
      featured: false
    },
    {
      id: 5,
      name: 'Modern Geometric',
      description: 'Contemporary design with geometric patterns',
      category: 'modern',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹249',
      downloads: 743,
      likes: 291,
      rating: 4.5,
      featured: false
    },
    {
      id: 6,
      name: 'Vintage Romance',
      description: 'Romantic vintage-style invitation with lace details',
      category: 'traditional',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹179',
      downloads: 892,
      likes: 445,
      rating: 4.8,
      featured: true
    },
    {
      id: 7,
      name: 'Mehendi Special',
      description: 'Perfect for mehendi ceremony invitations',
      category: 'traditional',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: 'Free',
      downloads: 1567,
      likes: 789,
      rating: 4.9,
      featured: false
    },
    {
      id: 8,
      name: 'Beach Wedding',
      description: 'Perfect for destination beach weddings',
      category: 'modern',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
      price: '₹199',
      downloads: 654,
      likes: 312,
      rating: 4.6,
      featured: false
    },
    {
      id: 9,
      name: 'Elegant Simplicity',
      description: 'Clean typography with subtle accents',
      category: 'minimalist',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹99',
      downloads: 987,
      likes: 456,
      rating: 4.4,
      featured: false
    }
  ];

  const filteredInvites = selectedCategory === 'all' 
    ? inviteTemplates 
    : inviteTemplates.filter(invite => invite.category === selectedCategory);

  return (
    <EinvitesContainer>
      <PageTitle>Digital Wedding Invitations</PageTitle>
      <PageSubtitle>
        Create stunning digital invitations for your special day. Choose from our collection of beautiful templates.
      </PageSubtitle>
      
      <FilterBar>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterBar>

      <InvitesGrid>
        {filteredInvites.map((invite, index) => (
          <InviteCard
            key={invite.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {invite.featured && <FeaturedBadge>Featured</FeaturedBadge>}
            
            <InviteImage src={invite.image}>
              <InviteOverlay>
                <InviteActions>
                  <ActionButton title="Preview">
                    <Eye size={20} />
                  </ActionButton>
                  <ActionButton title="Like">
                    <Heart size={20} />
                  </ActionButton>
                  <ActionButton title="Share">
                    <Share2 size={20} />
                  </ActionButton>
                </InviteActions>
              </InviteOverlay>
            </InviteImage>
            
            <InviteInfo>
              <h3>{invite.name}</h3>
              <p>{invite.description}</p>
              
              <InviteStats>
                <StatItem>
                  <Download size={14} />
                  <span>{invite.downloads}</span>
                </StatItem>
                <StatItem>
                  <Heart size={14} />
                  <span>{invite.likes}</span>
                </StatItem>
                <StatItem>
                  <Star size={14} />
                  <span>{invite.rating}</span>
                </StatItem>
                <PriceTag>{invite.price}</PriceTag>
              </InviteStats>
              
              <UseTemplateButton>
                Use This Template
              </UseTemplateButton>
            </InviteInfo>
          </InviteCard>
        ))}
      </InvitesGrid>
    </EinvitesContainer>
  );
};

export default Einvites;
