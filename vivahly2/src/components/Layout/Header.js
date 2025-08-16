import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Menu, X, User, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../UI/SearchBar';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: ${props => props.theme.shadows.light};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 70px;
    padding: 0 16px;
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.primary};
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.heavy};
  min-width: 200px;
  padding: 8px;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 8px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 20px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 999;
  overflow-y: auto;
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 16px 0;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 18px;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
`;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>💍</span>
          Vivahly
        </Logo>

        <Nav>
          <NavLink to="/vendors/all/wedding-venues">Venues</NavLink>
          <NavLink to="/vendors">Vendors</NavLink>
          <NavLink to="/photos">Photos</NavLink>
          <NavLink to="/real_wedding">Real Weddings</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/wedding-invitations">Invitations</NavLink>
        </Nav>

        <UserSection>
          <DesktopOnly>
            <SearchBar />
          </DesktopOnly>
          
          {user ? (
            <>
              <IconButton onClick={() => navigate('/wishlist')}>
                <Heart size={20} />
              </IconButton>
              
              <UserMenu>
                <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <span>{user.avatar}</span>
                  <DesktopOnly>
                    <span>{user.name}</span>
                  </DesktopOnly>
                </UserButton>
                
                <UserDropdown isOpen={userMenuOpen}>
                  <DropdownItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownItem>
                  <DropdownItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={() => navigate('/wishlist')}>
                    Wishlist
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </UserDropdown>
              </UserMenu>
            </>
          ) : (
            <DesktopOnly>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="btn">
                Sign Up
              </NavLink>
            </DesktopOnly>
          )}

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </UserSection>
      </HeaderContent>

      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileOnly style={{ paddingBottom: '20px' }}>
          <SearchBar />
        </MobileOnly>
        <MobileNavLink to="/vendors/all/wedding-venues" onClick={() => setMobileMenuOpen(false)}>
          Venues
        </MobileNavLink>
        <MobileNavLink to="/vendors" onClick={() => setMobileMenuOpen(false)}>
          Vendors
        </MobileNavLink>
        <MobileNavLink to="/photos" onClick={() => setMobileMenuOpen(false)}>
          Photos
        </MobileNavLink>
        <MobileNavLink to="/real_wedding" onClick={() => setMobileMenuOpen(false)}>
          Real Weddings
        </MobileNavLink>
        <MobileNavLink to="/blog" onClick={() => setMobileMenuOpen(false)}>
          Blog
        </MobileNavLink>
        <MobileNavLink to="/wedding-invitations" onClick={() => setMobileMenuOpen(false)}>
          Invitations
        </MobileNavLink>
        <MobileNavLink to="/write-a-review" onClick={() => setMobileMenuOpen(false)}>
          Write Review
        </MobileNavLink>
        {user ? (
          <>
            <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
              Profile
            </MobileNavLink>
            <MobileNavLink to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              Wishlist
            </MobileNavLink>
            <MobileNavLink as="button" onClick={handleLogout}>
              Logout
            </MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setMobileMenuOpen(false)}>
              Sign Up
            </MobileNavLink>
          </>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
