# Vivahly - Wedding Planning App (React)

A modern, responsive wedding planning application built with React, featuring AI-powered vendor recommendations, comprehensive vendor profiles, and seamless booking experiences.

## Features

### 🎯 Core Features
- **AI-Powered Recommendations**: Personalized vendor suggestions based on user preferences
- **Comprehensive Vendor Profiles**: Detailed information, portfolios, reviews, and pricing
- **Advanced Search & Filtering**: Find vendors by category, location, price range, and more
- **User Authentication**: Secure login/registration with 2FA support
- **Interactive Dashboard**: Manage bookings, wishlists, and wedding timeline
- **Real-time Reviews**: User-generated reviews and ratings
- **Mobile-First Design**: Responsive design optimized for all devices

### 🏛️ Vendor Categories
- Venues & Banquet Halls
- Photography & Videography
- Decoration & Floral Design
- Catering & Food Services
- Makeup Artists & Stylists
- Entertainment & Music
- Transportation Services
- Wedding Planners

### 🔧 Technical Features
- **React 18** with Hooks and Context API
- **React Router** for navigation
- **Styled Components** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Responsive Design** with mobile-first approach
- **Performance Optimized** with lazy loading and code splitting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vivahly-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Layout.js
│   └── UI/
│       └── SearchBar.js
├── contexts/
│   └── AuthContext.js
├── pages/
│   ├── Home/
│   │   ├── Home.js
│   │   ├── HeroSection.js
│   │   ├── Categories.js
│   │   ├── FeaturedVendors.js
│   │   ├── AIRecommendations.js
│   │   └── Testimonials.js
│   ├── Login/
│   │   └── Login.js
│   ├── Register/
│   │   └── Register.js
│   ├── VendorProfile/
│   ├── VendorList/
│   ├── Dashboard/
│   ├── Wishlist/
│   ├── BookingForm/
│   ├── Profile/
│   └── NotFound/
├── styles/
│   └── global.css
├── App.js
└── index.js
```

## Key Components

### Authentication
- Secure login/registration with email/phone
- Social login integration (Google, Facebook, Apple)
- Two-factor authentication support
- Password strength validation

### Home Page
- Hero section with call-to-action
- AI-powered recommendations for logged-in users
- Featured vendor carousel
- Category browsing
- User testimonials

### Vendor Management
- Advanced search and filtering
- Detailed vendor profiles
- Portfolio galleries
- Review and rating system
- Booking and inquiry forms

### User Dashboard
- Wedding timeline management
- Budget tracking
- Vendor communications
- Wishlist management
- Booking history

## Styling

The app uses **Styled Components** for a component-based styling approach:

- Theme-based design system
- Responsive breakpoints
- Consistent color palette
- Smooth animations and transitions
- Accessibility-focused components

### Color Scheme
- Primary: `#8B4513` (Saddle Brown)
- Secondary: `#CD853F` (Peru)
- Accent: `#DEB887` (Burlywood)
- Background: Linear gradients from pink to yellow tones

## State Management

- **React Context API** for global state (authentication, user data)
- **useState** and **useReducer** for component-level state
- **Custom hooks** for reusable logic

## API Integration

The app is designed to work with a RESTful API:

- Vendor search and filtering
- User authentication and profile management
- Booking and inquiry management
- Review and rating system
- Payment processing integration

## Performance Optimizations

- Lazy loading for images and components
- Memoized components with React.memo
- Efficient re-renders with useCallback and useMemo
- Code splitting with React.lazy
- Optimized bundle size

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- Semantic HTML structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: hello@vivahly.com
- Website: https://vivahly.com
- Documentation: https://docs.vivahly.com
