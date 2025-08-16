import React from 'react';
import styled from 'styled-components';
import { HelpCircle, Star, TrendingUp, Award } from 'lucide-react';

const ContentContainer = styled.div`
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadows.light};
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionContent = styled.div`
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const FAQContainer = styled.div`
  margin-top: 1rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const FAQQuestion = styled.h4`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const FAQAnswer = styled.p`
  color: ${props => props.theme.colors.gray};
  margin: 0;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const TipItem = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    margin-top: 0.1rem;
  }
`;

const PopularSearches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SearchTag = styled.span`
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const CategoryContent = ({ category, vendorCount }) => {
  const getCategoryContent = () => {
    switch (category) {
      case 'venues':
        return {
          title: 'Wedding Venues',
          description: 'Find the perfect venue for your special day from our extensive collection of banquet halls, outdoor venues, destination wedding locations, and more.',
          icon: <Award size={24} />,
          tips: [
            'Book your venue 6-12 months in advance',
            'Visit the venue during your wedding time to check lighting',
            'Confirm catering facilities and guest capacity',
            'Check for parking availability and accessibility',
            'Ask about decoration restrictions and policies',
            'Verify backup plans for outdoor venues'
          ],
          faqs: [
            {
              question: 'How far in advance should I book a wedding venue?',
              answer: 'It\'s recommended to book your venue 6-12 months in advance, especially for popular venues and peak wedding seasons.'
            },
            {
              question: 'What should I ask when visiting a venue?',
              answer: 'Ask about capacity, catering options, decoration policies, parking, accessibility, backup plans, and any additional charges.'
            },
            {
              question: 'Do venues provide catering services?',
              answer: 'Many venues offer in-house catering, while others allow external caterers. Always clarify this during your venue visit.'
            },
            {
              question: 'What is the average cost of wedding venues?',
              answer: 'Venue costs vary widely based on location, capacity, and amenities. Budget venues start from ₹50,000 while luxury venues can cost ₹5,00,000 or more.'
            }
          ],
          popularSearches: [
            'Banquet Halls Mumbai',
            'Outdoor Wedding Venues Delhi',
            'Destination Wedding Goa',
            'Luxury Wedding Venues',
            'Budget Wedding Venues',
            'Garden Wedding Venues'
          ]
        };
      
      case 'photography':
        return {
          title: 'Wedding Photographers',
          description: 'Capture your precious moments with professional wedding photographers specializing in candid, traditional, and pre-wedding photography.',
          icon: <Star size={24} />,
          tips: [
            'Book photographers 3-6 months before your wedding',
            'Review their portfolio and previous work',
            'Discuss your photography style preferences',
            'Confirm the number of photos and editing timeline',
            'Check if they provide albums and prints',
            'Ask about drone photography permissions'
          ],
          faqs: [
            {
              question: 'What\'s included in wedding photography packages?',
              answer: 'Packages typically include pre-wedding shoots, wedding day coverage, edited photos, and sometimes albums. Always confirm what\'s included.'
            },
            {
              question: 'How many photos will I receive?',
              answer: 'This varies by photographer, but typically you can expect 300-800 edited photos for a full wedding coverage.'
            },
            {
              question: 'Do photographers provide raw images?',
              answer: 'Most professional photographers provide edited images only. Raw images may be available for an additional cost.'
            },
            {
              question: 'What\'s the difference between candid and traditional photography?',
              answer: 'Candid photography captures natural moments, while traditional photography includes posed shots and formal portraits.'
            }
          ],
          popularSearches: [
            'Candid Wedding Photographers',
            'Pre Wedding Photography',
            'Traditional Wedding Photos',
            'Destination Wedding Photography',
            'Drone Wedding Photography',
            'Best Wedding Photographers'
          ]
        };
      
      case 'decorators':
        return {
          title: 'Wedding Decorators',
          description: 'Transform your venue with stunning wedding decorations including floral arrangements, mandap setups, lighting, and theme-based decor.',
          icon: <TrendingUp size={24} />,
          tips: [
            'Book decorators 2-4 months in advance',
            'Share your theme and color preferences',
            'Discuss venue restrictions and setup time',
            'Confirm what\'s included in decoration packages',
            'Ask for a detailed breakdown of costs',
            'Check if they handle cleanup after the event'
          ],
          faqs: [
            {
              question: 'What services do wedding decorators provide?',
              answer: 'Decorators provide floral arrangements, mandap decoration, stage setup, lighting, entrance decor, and theme-based decorations.'
            },
            {
              question: 'Do decorators work with my venue\'s restrictions?',
              answer: 'Professional decorators are experienced with various venue requirements and will work within your venue\'s guidelines.'
            },
            {
              question: 'Can I customize the decoration theme?',
              answer: 'Yes, most decorators offer customized themes based on your preferences, colors, and cultural requirements.'
            },
            {
              question: 'What\'s the cost range for wedding decoration?',
              answer: 'Decoration costs vary from ₹50,000 for basic setups to ₹5,00,000+ for elaborate luxury decorations.'
            }
          ],
          popularSearches: [
            'Floral Wedding Decorators',
            'Mandap Decoration',
            'Theme Wedding Decor',
            'Luxury Wedding Decorators',
            'Traditional Wedding Decor',
            'Destination Wedding Decorators'
          ]
        };
      
      case 'catering':
        return {
          title: 'Wedding Catering',
          description: 'Delight your guests with exceptional catering services offering multi-cuisine menus, live counters, and customized dining experiences.',
          icon: <Award size={24} />,
          tips: [
            'Book caterers 3-6 months before your wedding',
            'Arrange for food tasting sessions',
            'Discuss dietary restrictions and special requirements',
            'Confirm guest count and service style',
            'Check if they provide crockery and service staff',
            'Ask about bar services and beverage options'
          ],
          faqs: [
            {
              question: 'What types of catering services are available?',
              answer: 'Services include buffet, plated meals, live counters, cocktail services, and specialized dietary menus.'
            },
            {
              question: 'How much does wedding catering cost per person?',
              answer: 'Catering costs range from ₹800-₹3000 per person depending on the menu, service style, and location.'
            },
            {
              question: 'Do caterers handle venue coordination?',
              answer: 'Most professional caterers coordinate with venues for kitchen access, setup requirements, and timing.'
            },
            {
              question: 'Can I customize the menu?',
              answer: 'Yes, most caterers offer menu customization based on your preferences, cultural requirements, and dietary restrictions.'
            }
          ],
          popularSearches: [
            'Wedding Catering Packages',
            'Multi Cuisine Catering',
            'Vegetarian Wedding Catering',
            'Live Counter Catering',
            'Luxury Wedding Catering',
            'Budget Wedding Catering'
          ]
        };
      
      default:
        return {
          title: 'Wedding Services',
          description: 'Find the perfect wedding service providers for your special day.',
          icon: <HelpCircle size={24} />,
          tips: ['Research and compare multiple vendors', 'Read reviews and check portfolios', 'Book services well in advance'],
          faqs: [],
          popularSearches: []
        };
    }
  };

  const content = getCategoryContent();

  return (
    <ContentContainer>
      <ContentSection>
        <SectionTitle>
          {content.icon}
          Why Choose Professional {content.title}?
        </SectionTitle>
        <SectionContent>
          <p>{content.description}</p>
          <p>
            With {vendorCount}+ verified vendors in our network, we help you find the perfect match for your budget and requirements. 
            All our vendors are thoroughly vetted and come with genuine reviews from real couples.
          </p>
        </SectionContent>
      </ContentSection>

      <ContentSection>
        <SectionTitle>
          <HelpCircle size={24} />
          Things to Consider When Choosing {content.title}
        </SectionTitle>
        <TipsList>
          {content.tips.map((tip, index) => (
            <TipItem key={index}>{tip}</TipItem>
          ))}
        </TipsList>
      </ContentSection>

      {content.faqs.length > 0 && (
        <ContentSection>
          <SectionTitle>
            <HelpCircle size={24} />
            Frequently Asked Questions
          </SectionTitle>
          <FAQContainer>
            {content.faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion>{faq.question}</FAQQuestion>
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </ContentSection>
      )}

      {content.popularSearches.length > 0 && (
        <ContentSection>
          <SectionTitle>
            <TrendingUp size={24} />
            Popular Searches
          </SectionTitle>
          <PopularSearches>
            {content.popularSearches.map((search, index) => (
              <SearchTag key={index}>{search}</SearchTag>
            ))}
          </PopularSearches>
        </ContentSection>
      )}
    </ContentContainer>
  );
};

export default CategoryContent;
