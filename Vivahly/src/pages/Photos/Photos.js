import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { X, Download, Heart, Share2, ZoomIn } from 'lucide-react';

const PhotosContainer = styled.div`
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
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
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

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PhotoCard = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

const PhotoOverlay = styled.div`
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
  
  ${PhotoCard}:hover & {
    opacity: 1;
  }
`;

const PhotoActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
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

const PhotoInfo = styled.div`
  padding: 1rem;
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 2rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const LoadMoreButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 2rem auto;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Photos = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [visiblePhotos, setVisiblePhotos] = useState(12);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'bridal-lehenga', name: 'Bridal Lehenga' },
    { id: 'wedding-sarees', name: 'Wedding Sarees' },
    { id: 'engagement-dresses', name: 'Engagement Dresses' },
    { id: 'bridal-mehndi-dresses', name: 'Bridal Mehndi Dresses' },
    { id: 'blouse-designs', name: 'Blouse Designs' },
    { id: 'wedding-dresses', name: 'Wedding Dresses' },
    { id: 'bridal-jewellery', name: 'Bridal Jewellery' },
    { id: 'engagement-rings', name: 'Engagement Rings' },
    { id: 'floral-jewellery-designs', name: 'Floral Jewellery' },
    { id: 'wedding-jewellery', name: 'Wedding Jewellery' },
    { id: 'arabic-mehndi-designs', name: 'Arabic Mehndi' },
    { id: 'mehndi-designs', name: 'Mehndi Designs' },
    { id: 'simple-mehndi-designs', name: 'Simple Mehndi' },
    { id: 'unique-mehndi-designs', name: 'Unique Mehndi' },
    { id: 'wedding-decoration-ideas', name: 'Wedding Decoration' },
    { id: 'bridal-entry-ideas', name: 'Bridal Entry Ideas' },
    { id: 'groom-entry-ideas', name: 'Groom Entry Ideas' },
    { id: 'wedding-games-ideas', name: 'Wedding Games' },
    { id: 'wedding-card-designs', name: 'Wedding Cards' },
    { id: 'wedding-gifts-packing', name: 'Wedding Gifts' },
    { id: 'wedding-invitations', name: 'Wedding Invitations' },
    { id: 'pre-wedding-shoot-ideas', name: 'Pre-Wedding Shoot' },
    { id: 'indian-wedding-photos', name: 'Indian Wedding Photos' },
    { id: 'wedding-photoshoot-poses', name: 'Wedding Poses' },
    { id: 'sherwani-for-groom', name: 'Sherwani for Groom' },
    { id: 'wedding-suits-for-groom', name: 'Wedding Suits' },
    { id: 'groom-wedding-dresses', name: 'Groom Dresses' },
    { id: 'bridal-makeup-images', name: 'Bridal Makeup' },
    { id: 'bridal-hairstyles', name: 'Bridal Hairstyles' },
    { id: 'engagement-hairstyles', name: 'Engagement Hairstyles' },
    { id: 'hairstyles-for-mehndi', name: 'Mehndi Hairstyles' },
    { id: 'wedding-makeup', name: 'Wedding Makeup' }
  ];

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      title: 'Stunning Red Bridal Lehenga',
      description: 'Traditional Indian bridal lehenga with gold work',
      category: 'bridal-lehenga'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      title: 'Elegant Kanjivaram Saree',
      description: 'Traditional South Indian wedding saree',
      category: 'wedding-sarees'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Engagement Ring Close-up',
      description: 'Beautiful diamond engagement ring',
      category: 'engagement-rings'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Pre-Wedding Photoshoot',
      description: 'Romantic pre-wedding couple photography',
      category: 'pre-wedding-shoot-ideas'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      title: 'Bridal Makeup Look',
      description: 'Professional bridal makeup with bold eyes',
      category: 'bridal-makeup-images'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Bridal Hairstyle',
      description: 'Traditional braided hairstyle with flowers',
      category: 'bridal-hairstyles'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Arabic Mehndi Design',
      description: 'Beautiful Arabic henna patterns',
      category: 'arabic-mehndi-designs'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Intricate Mehndi Art',
      description: 'Traditional mehndi patterns on hands',
      category: 'mehndi-designs'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Wedding Invitation Card',
      description: 'Elegant wedding invitation design',
      category: 'wedding-invitations'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      title: 'Mandap Decoration',
      description: 'Beautiful floral wedding decoration',
      category: 'wedding-decoration-ideas'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Floral Jewellery',
      description: 'Fresh flower jewellery designs',
      category: 'floral-jewellery-designs'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Groom Sherwani',
      description: 'Traditional groom sherwani with turban',
      category: 'sherwani-for-groom'
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80',
      title: 'Bridal Makeup',
      description: 'Professional bridal beauty',
      category: 'prewedding'
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
      title: 'Beach Wedding',
      description: 'Destination wedding bliss',
      category: 'ceremony'
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Wedding Music',
      description: 'Live musical celebration',
      category: 'reception'
    },
    {
      id: 16,
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Wedding Feast',
      description: 'Delicious wedding banquet',
      category: 'reception'
    },
    {
      id: 17,
      src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Wedding Car',
      description: 'Elegant transportation',
      category: 'ceremony'
    },
    {
      id: 18,
      src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      title: 'Wedding Venue',
      description: 'Stunning ceremony location',
      category: 'ceremony'
    }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const displayedPhotos = filteredPhotos.slice(0, visiblePhotos);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleLoadMore = () => {
    setVisiblePhotos(prev => prev + 12);
  };

  return (
    <PhotosContainer>
      <PageTitle>Wedding Photo Gallery</PageTitle>
      
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

      <PhotoGrid>
        {displayedPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handlePhotoClick(photo)}
          >
            <PhotoImage src={photo.src} alt={photo.title} />
            <PhotoOverlay>
              <PhotoActions>
                <ActionButton>
                  <ZoomIn size={20} />
                </ActionButton>
                <ActionButton>
                  <Heart size={20} />
                </ActionButton>
                <ActionButton>
                  <Share2 size={20} />
                </ActionButton>
              </PhotoActions>
            </PhotoOverlay>
            <PhotoInfo>
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
            </PhotoInfo>
          </PhotoCard>
        ))}
      </PhotoGrid>

      {displayedPhotos.length < filteredPhotos.length && (
        <LoadMoreButton onClick={handleLoadMore}>
          Load More Photos
        </LoadMoreButton>
      )}

      <Modal isOpen={!!selectedPhoto}>
        {selectedPhoto && (
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>
              <X size={24} />
            </CloseButton>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
          </ModalContent>
        )}
      </Modal>
    </PhotosContainer>
  );
};

export default Photos;
