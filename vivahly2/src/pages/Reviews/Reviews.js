import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, Camera, MapPin, Calendar } from 'lucide-react';

const ReviewsContainer = styled.div`
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

const ReviewForm = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.white};
  padding: 40px;
  border-radius: 15px;
  box-shadow: ${props => props.theme.shadows.light};
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.filled ? '#FFD700' : props.theme.colors.lightGray};
  font-size: 24px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #FFD700;
  }
`;

const PhotoUpload = styled.div`
  border: 2px dashed ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const UploadIcon = styled(Camera)`
  width: 48px;
  height: 48px;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 15px;
`;

const UploadText = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 15px;
`;

const UploadButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const RecentReviews = styled.div`
  max-width: 1200px;
  margin: 60px auto 0;
`;

const ReviewsTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 40px;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
`;

const ReviewCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: 25px;
  border-radius: 15px;
  box-shadow: ${props => props.theme.shadows.light};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ReviewerName = styled.h4`
  margin: 0 0 5px;
  color: ${props => props.theme.colors.primary};
`;

const ReviewMeta = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin: 15px 0;
`;

const VendorInfo = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
`;

const VendorName = styled.h5`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 5px;
`;

const VendorCategory = styled.span`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
`;

const Reviews = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorCategory: '',
    rating: 0,
    reviewTitle: '',
    reviewText: '',
    reviewerName: '',
    reviewerEmail: '',
    weddingDate: '',
    location: ''
  });

  const [rating, setRating] = useState(0);

  const vendorCategories = [
    'Wedding Venues',
    'Wedding Photographers',
    'Bridal Makeup Artists',
    'Wedding Planners',
    'Wedding Decorators',
    'Mehendi Artists',
    'Wedding Caterers',
    'Wedding Cards',
    'Bridal Wear',
    'Groom Wear',
    'Wedding Jewellery',
    'DJs',
    'Wedding Entertainment'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Review submitted:', { ...formData, rating });
    // Reset form
    setFormData({
      vendorName: '',
      vendorCategory: '',
      rating: 0,
      reviewTitle: '',
      reviewText: '',
      reviewerName: '',
      reviewerEmail: '',
      weddingDate: '',
      location: ''
    });
    setRating(0);
  };

  // Sample recent reviews
  const recentReviews = [
    {
      id: 1,
      reviewerName: "Priya & Rahul",
      vendorName: "The Leela Palace",
      vendorCategory: "Wedding Venues",
      rating: 5,
      reviewText: "Absolutely stunning venue! The staff was incredibly helpful and the food was exceptional. Our wedding was perfect!",
      date: "2024-01-15",
      location: "Mumbai"
    },
    {
      id: 2,
      reviewerName: "Anita & Karan",
      vendorName: "Shutter Stories",
      vendorCategory: "Wedding Photographers",
      rating: 5,
      reviewText: "Amazing photography team! They captured every moment beautifully. Highly recommend!",
      date: "2024-01-12",
      location: "Delhi"
    },
    {
      id: 3,
      reviewerName: "Sneha & Arjun",
      vendorName: "Bridal Glow",
      vendorCategory: "Bridal Makeup Artists",
      rating: 4,
      reviewText: "Great makeup artist! Very professional and the look lasted all day. Minor delay but overall satisfied.",
      date: "2024-01-10",
      location: "Bangalore"
    }
  ];

  return (
    <ReviewsContainer>
      <Header>
        <Title>Write a Review</Title>
        <Subtitle>
          Share your experience and help other couples make the right choice
        </Subtitle>
      </Header>

      <ReviewForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Vendor Name*</Label>
            <Input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleInputChange}
              required
              placeholder="Enter vendor name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Vendor Category*</Label>
            <Select
              name="vendorCategory"
              value={formData.vendorCategory}
              onChange={handleInputChange}
              required
            >
              <option value="">Select category</option>
              {vendorCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Rating*</Label>
            <StarRating>
              {[1, 2, 3, 4, 5].map(star => (
                <StarButton
                  key={star}
                  type="button"
                  filled={star <= rating}
                  onClick={() => setRating(star)}
                >
                  <Star fill={star <= rating ? "#FFD700" : "none"} />
                </StarButton>
              ))}
            </StarRating>
          </FormGroup>

          <FormGroup>
            <Label>Review Title*</Label>
            <Input
              type="text"
              name="reviewTitle"
              value={formData.reviewTitle}
              onChange={handleInputChange}
              required
              placeholder="Give your review a title"
            />
          </FormGroup>

          <FormGroup>
            <Label>Your Review*</Label>
            <TextArea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleInputChange}
              required
              placeholder="Share your experience with this vendor"
            />
          </FormGroup>

          <FormGroup>
            <Label>Your Name*</Label>
            <Input
              type="text"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email*</Label>
            <Input
              type="email"
              name="reviewerEmail"
              value={formData.reviewerEmail}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup>
            <Label>Wedding Date</Label>
            <Input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Wedding location"
            />
          </FormGroup>

          <FormGroup>
            <Label>Upload Photos</Label>
            <PhotoUpload>
              <UploadIcon />
              <UploadText>Add photos from your wedding</UploadText>
              <UploadButton type="button">Choose Files</UploadButton>
            </PhotoUpload>
          </FormGroup>

          <SubmitButton type="submit">Submit Review</SubmitButton>
        </form>
      </ReviewForm>

      <RecentReviews>
        <ReviewsTitle>Recent Reviews</ReviewsTitle>
        <ReviewsGrid>
          {recentReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ReviewHeader>
                <div>
                  <ReviewerName>{review.reviewerName}</ReviewerName>
                  <ReviewMeta>
                    <StarRating>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= review.rating ? "#FFD700" : "none"}
                          color={star <= review.rating ? "#FFD700" : "#E5E5E5"}
                        />
                      ))}
                    </StarRating>
                    <Calendar size={14} />
                    <span>{review.date}</span>
                    <MapPin size={14} />
                    <span>{review.location}</span>
                  </ReviewMeta>
                </div>
              </ReviewHeader>
              <ReviewText>{review.reviewText}</ReviewText>
              <VendorInfo>
                <VendorName>{review.vendorName}</VendorName>
                <VendorCategory>{review.vendorCategory}</VendorCategory>
              </VendorInfo>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </RecentReviews>
    </ReviewsContainer>
  );
};

export default Reviews;
