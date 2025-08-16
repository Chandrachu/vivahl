import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Smartphone, Play } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 40px 0 20px;
  margin-top: 80px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
    color: ${props => props.theme.colors.accent};
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 24px;
  }
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const AppBadges = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const AppBadge = styled.span`
  display: inline-block;
  transition: all 0.3s ease;
  
  a {
    display: inline-block;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      opacity: 0.8;
    }
    
    img {
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Vivahly</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '16px' }}>
              Your perfect wedding planning companion. Connect with the best vendors, 
              venues, and services for your special day.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLink to="/vendors">Find Vendors</FooterLink>
            <FooterLink to="/venues">Venues</FooterLink>
            <FooterLink to="/photos">Photo Gallery</FooterLink>
            <FooterLink to="/blog">Wedding Blog</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>For Vendors</h3>
            <FooterLink to="/vendor-signup">Join as Vendor</FooterLink>
            <FooterLink to="/vendor-login">Vendor Login</FooterLink>
            <FooterLink to="/pricing">Pricing Plans</FooterLink>
            <FooterLink to="/help">Help Center</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Contact Us</h3>
            <ContactInfo>
              <Mail size={16} />
              <span>hello@vivahly.com</span>
            </ContactInfo>
            <ContactInfo>
              <Phone size={16} />
              <span>+91 1234567890</span>
            </ContactInfo>
            <ContactInfo>
              <MapPin size={16} />
              <span>Mumbai, India</span>
            </ContactInfo>
            
            <AppBadges>
              <AppBadge className="app-store">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://images.wedmegood.com/react-frontend-v4/static/media/download-app-store.9a3541d8.png" 
                    alt="Download on the App Store" 
                    width="169" 
                    height="50"
                  />
                </a>
              </AppBadge>
              <AppBadge className="play-store">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://images.wedmegood.com/react-frontend-v4/static/media/download-play-store.787ef1b7.png" 
                    alt="Download on the Google Play" 
                    width="169" 
                    height="50"
                  />
                </a>
              </AppBadge>
            </AppBadges>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>&copy; 2024 Vivahly. All rights reserved.</p>
          <div style={{ marginTop: '8px' }}>
            <FooterLink to="/privacy" style={{ display: 'inline', marginRight: '16px' }}>
              Privacy Policy
            </FooterLink>
            <FooterLink to="/terms" style={{ display: 'inline', marginRight: '16px' }}>
              Terms of Service
            </FooterLink>
            <FooterLink to="/cookies" style={{ display: 'inline' }}>
              Cookie Policy
            </FooterLink>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
