import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CategoriesContainer = styled.section`
  padding: 80px 0;
  background: white;
`;

const CategoriesContent = styled.div`
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.heavy};
    border-color: ${props => props.theme.colors.primary};
  }

  .image-container {
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
  }

  .category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover .category-image {
    transform: scale(1.1);
  }

  .content {
    padding: 1.5rem;
    text-align: center;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 1rem;
    }
  }

  h3 {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
  }
`;

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80',
      title: 'Venues',
      description: 'Beautiful venues for your ceremony',
      category: 'venues',
      url: '/vendors/all/wedding-venues'
    },
    {
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Photography',
      description: 'Capture your precious moments',
      category: 'photography',
      url: '/vendors/all/wedding-photographers'
    },
    {
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      title: 'Decorators',
      description: 'Transform your venue beautifully',
      category: 'decorators',
      url: '/vendors/all/wedding-decorators'
    },
    {
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Catering',
      description: 'Delicious food for your guests',
      category: 'catering',
      url: '/vendors/all/wedding-catering'
    },
    {
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      title: 'Makeup Artists',
      description: 'Look stunning on your big day',
      category: 'makeup',
      url: '/vendors?category=makeup'
    },
    {
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Entertainment',
      description: 'Music and entertainment services',
      category: 'entertainment',
      url: '/vendors?category=entertainment'
    },
    {
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Transportation',
      description: 'Stylish rides for the couple',
      category: 'transportation',
      url: '/vendors?category=transportation'
    },
    {
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      title: 'Planners',
      description: 'Professional wedding planners',
      category: 'planners',
      url: '/vendors?category=planners'
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(category.url);
  };

  return (
    <CategoriesContainer>
      <CategoriesContent>
        <SectionTitle>Wedding Categories</SectionTitle>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="image-container">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="category-image"
                />
              </div>
              <div className="content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
