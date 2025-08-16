import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Share2, Edit, Eye, Heart, Star, X, Play, Pause, 
  Search, Filter, Grid, List, Calendar, User, Clock, Palette, 
  Image, Video, FileText, ChevronDown, ChevronRight, Plus, 
  Camera, Upload, Save, Settings, Sparkles, Zap, Crown, 
  TrendingUp, Award, Gift, Users, MessageCircle, RefreshCw
} from 'lucide-react';

const EinvitesContainer = styled.div`
  min-height: 100vh;
  padding: 80px 20px 40px;
  background: ${props => props.theme.colors.background};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  position: relative;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.accent};
    border-radius: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 5px;
  }
  
  p {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
  }
`;

const ControlsSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
  max-width: 500px;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 45px 12px 20px;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 25px;
  font-size: 1rem;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
`;

const SearchIcon = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  background: ${props => props.theme.colors.white};
  border-radius: 25px;
  padding: 4px;
  box-shadow: ${props => props.theme.shadows.light};
`;

const ViewButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.showAll ? 'flex' : 'none'};
    
    &.mobile-visible {
      display: flex;
      
      button:nth-child(n+6) {
        display: ${props => props.showAll ? 'block' : 'none'};
      }
    }
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr'};
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TemplateCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const TemplateImage = styled.div`
  height: 300px;
  background: url(${props => props.src}) center/cover;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.1), transparent);
  }
`;

const TemplateOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${TemplateCard}:hover & {
    opacity: 1;
  }
`;

const OverlayActions = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
`;

const TemplateInfo = styled.div`
  padding: 25px;
`;

const TemplateTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 8px;
  font-weight: 600;
`;

const TemplateDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const TemplateStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
`;

const StatGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PriceTag = styled.div`
  background: ${props => props.free ? props.theme.colors.success : props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 10;
`;

const TrendingBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${props => props.theme.colors.warning};
  color: ${props => props.theme.colors.white};
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 10;
`;

const UseTemplateButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const LoadMoreButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 40px auto 0;
  display: block;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 30px;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const PreviewSection = styled.div`
  margin-bottom: 30px;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 400px;
  background: url(${props => props.src}) center/cover;
  border-radius: 15px;
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.1), transparent);
    border-radius: 15px;
  }
`;

const CustomizationSection = styled.div`
  margin-bottom: 30px;
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 20px;
  }
`;

const CustomizationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CustomizationCard = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  
  h4 {
    font-size: 1rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 10px;
  }
  
  p {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
  }
`;

const DownloadSection = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const DownloadButton = styled.button`
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
`;

const EinvitesImproved = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [visibleTemplates, setVisibleTemplates] = useState(6);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [templates, setTemplates] = useState([]);

  const categories = [
    { id: 'all', name: 'All Templates', icon: <FileText size={16} /> },
    { id: 'wedding-card-designs', name: 'Wedding Cards', icon: <Image size={16} /> },
    { id: 'video-templates', name: 'Video Templates', icon: <Video size={16} /> },
    { id: 'save-the-date-templates', name: 'Save The Date', icon: <Calendar size={16} /> },
    { id: 'traditional', name: 'Traditional', icon: <Crown size={16} /> },
    { id: 'modern', name: 'Modern', icon: <Zap size={16} /> },
    { id: 'floral', name: 'Floral', icon: <Sparkles size={16} /> },
    { id: 'minimalist', name: 'Minimalist', icon: <Palette size={16} /> },
    { id: 'luxury', name: 'Luxury', icon: <Award size={16} /> },
    { id: 'cultural', name: 'Cultural', icon: <Users size={16} /> }
  ];

  const sampleTemplates = [
    {
      id: 1,
      name: 'Fountain Chandelier Caricature Theme',
      description: 'Elegant design with fountain and chandelier elements, perfect for luxury weddings',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: 'Free',
      downloads: 1250,
      likes: 456,
      rating: 4.8,
      featured: true,
      trending: true,
      premium: false,
      type: 'static'
    },
    {
      id: 2,
      name: 'Bells Swan Fort Theme',
      description: 'Traditional fort design with swan and bells, ideal for royal weddings',
      category: 'wedding-card-designs',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹199',
      downloads: 890,
      likes: 324,
      rating: 4.6,
      featured: false,
      trending: false,
      premium: true,
      type: 'static'
    },
    {
      id: 3,
      name: 'Animated Wedding Video Template',
      description: 'Beautiful animated invitation with music and motion graphics',
      category: 'video-templates',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹599',
      downloads: 743,
      likes: 291,
      rating: 4.5,
      featured: true,
      trending: true,
      premium: true,
      type: 'video'
    },
    {
      id: 4,
      name: 'Elegant Save The Date',
      description: 'Perfect for save the date announcements with beautiful typography',
      category: 'save-the-date-templates',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: 'Free',
      downloads: 1567,
      likes: 789,
      rating: 4.9,
      featured: false,
      trending: false,
      premium: false,
      type: 'static'
    },
    {
      id: 5,
      name: 'Floral Paradise Design',
      description: 'Beautiful floral patterns with watercolor effects',
      category: 'floral',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹299',
      downloads: 1120,
      likes: 678,
      rating: 4.7,
      featured: true,
      trending: false,
      premium: true,
      type: 'static'
    },
    {
      id: 6,
      name: 'Minimalist Elegance',
      description: 'Clean and modern design with subtle accents',
      category: 'minimalist',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹149',
      downloads: 892,
      likes: 445,
      rating: 4.8,
      featured: false,
      trending: true,
      premium: false,
      type: 'static'
    },
    {
      id: 7,
      name: 'Royal Luxury Gold',
      description: 'Opulent design with rich gold colors and patterns',
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      price: '₹499',
      downloads: 567,
      likes: 234,
      rating: 4.9,
      featured: true,
      trending: false,
      premium: true,
      type: 'static'
    },
    {
      id: 8,
      name: 'Cultural Heritage',
      description: 'Traditional Indian cultural motifs and patterns',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
      price: '₹199',
      downloads: 654,
      likes: 312,
      rating: 4.6,
      featured: false,
      trending: false,
      premium: true,
      type: 'static'
    },
    {
      id: 9,
      name: 'Modern Geometric',
      description: 'Contemporary design with geometric patterns and bold colors',
      category: 'modern',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: '₹249',
      downloads: 987,
      likes: 456,
      rating: 4.4,
      featured: false,
      trending: true,
      premium: false,
      type: 'static'
    },
    {
      id: 10,
      name: 'Cinematic Wedding Video',
      description: 'Hollywood-style video invitation with dramatic effects',
      category: 'video-templates',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: '₹799',
      downloads: 445,
      likes: 201,
      rating: 4.7,
      featured: true,
      trending: true,
      premium: true,
      type: 'video'
    }
  ];

  useEffect(() => {
    setTemplates(sampleTemplates);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openTemplate = (template) => {
    setSelectedTemplate(template);
    document.body.style.overflow = 'hidden';
  };

  const closeTemplate = () => {
    setSelectedTemplate(null);
    document.body.style.overflow = 'unset';
  };

  const handleDownload = (template) => {
    // Simulate download
    alert(`Downloading ${template.name}...`);
    // In a real app, this would trigger the actual download
  };

  const handleCustomize = (template) => {
    navigate(`/customize/${template.id}`);
  };

  const loadMoreTemplates = () => {
    setVisibleTemplates(prev => prev + 6);
  };

  let filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedTemplates = filteredTemplates.slice(0, visibleTemplates);
  const totalTemplates = templates.length;
  const totalDownloads = templates.reduce((sum, template) => sum + template.downloads, 0);
  const totalLikes = templates.reduce((sum, template) => sum + template.likes, 0);

  return (
    <EinvitesContainer>
      <Header>
        <Title>Wedding Invitations</Title>
        <Subtitle>
          Create stunning digital invitations for your special day. Choose from our collection of beautiful templates.
        </Subtitle>
        <Stats>
          <StatItem>
            <h3>{totalTemplates}</h3>
            <p>Templates</p>
          </StatItem>
          <StatItem>
            <h3>{totalDownloads.toLocaleString()}</h3>
            <p>Downloads</p>
          </StatItem>
          <StatItem>
            <h3>{totalLikes}</h3>
            <p>Likes</p>
          </StatItem>
        </Stats>
      </Header>

      <ControlsSection>
        <SearchSection>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
          </SearchBar>
        </SearchSection>
        
        <FilterControls>
          <FilterButton onClick={() => setShowAllCategories(!showAllCategories)}>
            <Filter size={16} />
            Categories
            {showAllCategories ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </FilterButton>
          
          <ViewToggle>
            <ViewButton 
              active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'} 
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </ViewButton>
          </ViewToggle>
        </FilterControls>
      </ControlsSection>

      <CategoryTabs showAll={showAllCategories} className="mobile-visible">
        {categories.map(cat => (
          <CategoryButton
            key={cat.id}
            active={selectedCategory === cat.id}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon}
            {cat.name}
          </CategoryButton>
        ))}
      </CategoryTabs>

      <TemplatesGrid viewMode={viewMode}>
        {displayedTemplates.map((template, index) => (
          <TemplateCard
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openTemplate(template)}
          >
            {template.featured && (
              <PremiumBadge>
                <Crown size={12} />
                Featured
              </PremiumBadge>
            )}
            {template.trending && (
              <TrendingBadge>
                <TrendingUp size={12} />
                Trending
              </TrendingBadge>
            )}
            
            <TemplateImage src={template.image}>
              <TemplateOverlay>
                <OverlayActions>
                  <ActionButton onClick={(e) => {
                    e.stopPropagation();
                    handleCustomize(template);
                  }}>
                    <Edit size={16} />
                    Customize
                  </ActionButton>
                  <ActionButton>
                    <Eye size={16} />
                    Preview
                  </ActionButton>
                </OverlayActions>
              </TemplateOverlay>
            </TemplateImage>
            
            <TemplateInfo>
              <TemplateTitle>{template.name}</TemplateTitle>
              <TemplateDescription>{template.description}</TemplateDescription>
              
              <TemplateStats>
                <StatGroup>
                  <StatIcon>
                    <Download size={14} />
                    <span>{template.downloads}</span>
                  </StatIcon>
                  <StatIcon>
                    <Heart size={14} />
                    <span>{template.likes}</span>
                  </StatIcon>
                  <StatIcon>
                    <Star size={14} />
                    <span>{template.rating}</span>
                  </StatIcon>
                </StatGroup>
                <PriceTag free={template.price === 'Free'}>
                  {template.price}
                </PriceTag>
              </TemplateStats>
              
              <UseTemplateButton onClick={(e) => {
                e.stopPropagation();
                handleCustomize(template);
              }}>
                Use This Template
              </UseTemplateButton>
            </TemplateInfo>
          </TemplateCard>
        ))}
      </TemplatesGrid>

      {displayedTemplates.length < filteredTemplates.length && (
        <LoadMoreButton onClick={loadMoreTemplates}>
          Load More Templates
        </LoadMoreButton>
      )}

      {/* Template Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTemplate}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <CloseButton onClick={closeTemplate}>
                  <X size={24} />
                </CloseButton>
                <h2>{selectedTemplate.name}</h2>
                <p>{selectedTemplate.description}</p>
              </ModalHeader>
              
              <ModalBody>
                <PreviewSection>
                  <PreviewImage src={selectedTemplate.image} />
                  {selectedTemplate.type === 'video' && (
                    <div style={{ textAlign: 'center' }}>
                      <ActionButton>
                        <Play size={16} />
                        Play Video Preview
                      </ActionButton>
                    </div>
                  )}
                </PreviewSection>
                
                <CustomizationSection>
                  <h3>Customization Options</h3>
                  <CustomizationGrid>
                    <CustomizationCard>
                      <Palette size={24} color="#8B4513" />
                      <h4>Colors</h4>
                      <p>Change theme colors</p>
                    </CustomizationCard>
                    <CustomizationCard>
                      <FileText size={24} color="#8B4513" />
                      <h4>Text</h4>
                      <p>Edit all text content</p>
                    </CustomizationCard>
                    <CustomizationCard>
                      <Image size={24} color="#8B4513" />
                      <h4>Images</h4>
                      <p>Upload your photos</p>
                    </CustomizationCard>
                    <CustomizationCard>
                      <Settings size={24} color="#8B4513" />
                      <h4>Layout</h4>
                      <p>Adjust positioning</p>
                    </CustomizationCard>
                  </CustomizationGrid>
                </CustomizationSection>
                
                <DownloadSection>
                  <ActionButton onClick={() => handleCustomize(selectedTemplate)}>
                    <Edit size={16} />
                    Customize Template
                  </ActionButton>
                  <DownloadButton onClick={() => handleDownload(selectedTemplate)}>
                    <Download size={16} />
                    Download Now
                  </DownloadButton>
                  <ActionButton>
                    <Share2 size={16} />
                    Share Template
                  </ActionButton>
                </DownloadSection>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </EinvitesContainer>
  );
};

export default EinvitesImproved;
