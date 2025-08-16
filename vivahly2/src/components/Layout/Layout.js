import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding-top: ${props => props.hideHeader ? '0' : '80px'};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: ${props => props.hideHeader ? '0' : '70px'};
  }
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <LayoutContainer>
      {!hideHeaderFooter && <Header />}
      <Main hideHeader={hideHeaderFooter}>
        {children}
      </Main>
      {!hideHeaderFooter && <Footer />}
    </LayoutContainer>
  );
};

export default Layout;
