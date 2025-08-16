import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VendorProfile from './pages/VendorProfile/VendorProfile';
import VendorList from './pages/VendorList/VendorList';
import Dashboard from './pages/Dashboard/Dashboard';
import Wishlist from './pages/Wishlist/Wishlist';
import BookingForm from './pages/BookingForm/BookingForm';
import Profile from './pages/Profile/Profile';
import Photos from './pages/Photos/Photos';
import Einvites from './pages/Einvites/Einvites';
import Blog from './pages/Blog/Blog';
import RealWeddings from './pages/RealWeddings/RealWeddings';
import Reviews from './pages/Reviews/Reviews';
import NotFound from './pages/NotFound/NotFound';

const theme = {
  colors: {
    primary: '#8B4513',
    secondary: '#CD853F',
    accent: '#DEB887',
    background: 'linear-gradient(135deg, #FCE4EC 0%, #FFF8E1 100%)',
    white: '#FFFFFF',
    gray: '#666666',
    lightGray: '#E5E5E5',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    text: '#333333',
  },
  fonts: {
    primary: 'Roboto, sans-serif',
    heading: 'Playfair Display, serif',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  shadows: {
    light: '0 4px 15px rgba(0, 0, 0, 0.1)',
    medium: '0 6px 20px rgba(0, 0, 0, 0.1)',
    heavy: '0 12px 30px rgba(0, 0, 0, 0.15)',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Vendor Routes */}
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendors/all" element={<VendorList />} />
            <Route path="/vendors/all/wedding-venues" element={<VendorList category="wedding-venues" />} />
            <Route path="/vendors/all/wedding-venues/all/:venueType" element={<VendorList category="wedding-venues" />} />
            <Route path="/vendors/all/wedding-photographers" element={<VendorList category="wedding-photographers" />} />
            <Route path="/vendors/all/bridal-makeup" element={<VendorList category="bridal-makeup" />} />
            <Route path="/vendors/all/family-makeup" element={<VendorList category="family-makeup" />} />
            <Route path="/vendors/all/wedding-planners" element={<VendorList category="wedding-planners" />} />
            <Route path="/vendors/all/wedding-decorators" element={<VendorList category="wedding-decorators" />} />
            <Route path="/vendors/all/mehendi-artists" element={<VendorList category="mehendi-artists" />} />
            <Route path="/vendors/all/djs" element={<VendorList category="djs" />} />
            <Route path="/vendors/all/sangeet-choreographers" element={<VendorList category="sangeet-choreographers" />} />
            <Route path="/vendors/all/wedding-entertainment" element={<VendorList category="wedding-entertainment" />} />
            <Route path="/vendors/all/wedding-cards" element={<VendorList category="wedding-cards" />} />
            <Route path="/vendors/all/wedding-favors" element={<VendorList category="wedding-favors" />} />
            <Route path="/vendors/all/wedding-catering" element={<VendorList category="wedding-catering" />} />
            <Route path="/vendors/all/wedding-cakes" element={<VendorList category="wedding-cakes" />} />
            <Route path="/vendors/all/bridal-wear" element={<VendorList category="bridal-wear" />} />
            <Route path="/vendors/all/groom-wear" element={<VendorList category="groom-wear" />} />
            <Route path="/vendors/all/wedding-jewellery" element={<VendorList category="wedding-jewellery" />} />
            <Route path="/vendors/all/wedding-accessories" element={<VendorList category="wedding-accessories" />} />
            <Route path="/vendors/all/beauty-and-wellness" element={<VendorList category="beauty-and-wellness" />} />
            
            {/* City-wise Vendor Routes */}
            <Route path="/vendors/:city/wedding-venues" element={<VendorList category="wedding-venues" />} />
            <Route path="/vendors/:city/wedding-photographers" element={<VendorList category="wedding-photographers" />} />
            <Route path="/vendors/:city/bridal-makeup" element={<VendorList category="bridal-makeup" />} />
            <Route path="/vendors/:city/wedding-planners" element={<VendorList category="wedding-planners" />} />
            <Route path="/vendors/:city/wedding-decorators" element={<VendorList category="wedding-decorators" />} />
            
            {/* Photos Routes */}
            <Route path="/photos" element={<Photos />} />
            <Route path="/photos/:category" element={<Photos />} />
            
            {/* Real Weddings Routes */}
            <Route path="/real_wedding" element={<RealWeddings />} />
            <Route path="/real_wedding/:city" element={<RealWeddings />} />
            <Route path="/real_wedding/all/:culture" element={<RealWeddings />} />
            <Route path="/real_wedding/detail/:id" element={<RealWeddings />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:category" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            
            {/* Reviews Routes */}
            <Route path="/write-a-review" element={<Reviews />} />
            
            {/* Wedding Invitations */}
            <Route path="/wedding-invitations" element={<Einvites />} />
            <Route path="/wedding-invitations/wedding-card-designs" element={<Einvites />} />
            <Route path="/wedding-invitations/video-templates" element={<Einvites />} />
            <Route path="/wedding-invitations/save-the-date-templates" element={<Einvites />} />
            
            {/* Individual Vendor */}
            <Route path="/vendor/:id" element={<VendorProfile />} />
            <Route path="/wedding-venues/:slug" element={<VendorProfile />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/booking/:vendorId" element={<BookingForm />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
