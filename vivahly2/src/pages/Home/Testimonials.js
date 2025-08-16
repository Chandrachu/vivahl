import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsContainer = styled.section`
  padding: 80px 0;
  background: white;
`;

const TestimonialsContent = styled.div`
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -10px;
  left: 30px;
  background: ${props => props.theme.colors.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B4513, #CD853F);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.2rem;
`;

const AuthorDetails = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.2rem;
  color: #FFD700;
`;

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Vivahly made our wedding planning so much easier! The AI recommendations were spot-on, and we found the perfect vendors for our dream wedding. The platform is intuitive and the customer service is exceptional.",
      author: "Priya & Raj",
      details: "Married in Mumbai • Dec 2023",
      rating: 5,
      avatar: "👰‍♀️🤵‍♂️"
    },
    {
      id: 2,
      text: "From venue selection to photographer booking, everything was seamless. The vendor profiles were detailed and genuine. We saved so much time and stress thanks to Vivahly's comprehensive platform.",
      author: "Anisha & Karthik",
      details: "Married in Bangalore • Nov 2023",
      rating: 5,
      avatar: "💑"
    },
    {
      id: 3,
      text: "The quality of vendors on Vivahly is outstanding. We got exactly what we wanted within our budget. The reviews and ratings helped us make informed decisions. Highly recommended!",
      author: "Meera & Arjun",
      details: "Married in Delhi • Oct 2023",
      rating: 5,
      avatar: "👫"
    }
  ];

  const renderStars = (rating) => {
    return Array(rating).fill(0).map((_, index) => (
      <Star key={index} size={16} fill="currentColor" />
    ));
  };

  return (
    <TestimonialsContainer>
      <TestimonialsContent>
        <SectionTitle>What Our Couples Say</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <QuoteIcon>
                <Quote size={20} />
              </QuoteIcon>
              
              <TestimonialText>
                "{testimonial.text}"
              </TestimonialText>
              
              <TestimonialAuthor>
                <AuthorAvatar>
                  {testimonial.avatar}
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorDetails>{testimonial.details}</AuthorDetails>
                  <Rating>
                    {renderStars(testimonial.rating)}
                  </Rating>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsContent>
    </TestimonialsContainer>
  );
};

export default Testimonials;
