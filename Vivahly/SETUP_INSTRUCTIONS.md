# Vivahly React App - Setup Instructions

## 🚀 Quick Start

Follow these steps to get your Vivahly wedding planning app running:

### 1. Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### 2. Installation

1. **Navigate to your project directory:**
   ```bash
   cd /path/to/your/project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload when you make changes

## 📱 Features Available

### ✅ **Fully Functional Pages**

1. **Home Page (`/`)**
   - Hero section with animations
   - AI-powered recommendations for logged-in users
   - Featured vendors carousel
   - Category browsing
   - User testimonials

2. **Login/Register (`/login`, `/register`)**
   - Email/password authentication
   - 2FA support with OTP
   - Social login buttons
   - Form validation

3. **Vendor Listings** (WedMeGood-style URLs):
   - `/vendors/all/wedding-venues` - Wedding Venues
   - `/vendors/all/wedding-photographers` - Photographers
   - `/vendors/all/wedding-decorators` - Decorators
   - `/vendors/all/wedding-catering` - Catering Services
   - `/vendors` - All vendors with filtering

4. **User Dashboard (`/dashboard`)**
   - Welcome message for logged-in users
   - Wedding planning overview

### 🎯 **Key Features**

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Search & Filtering** - Search by name, filter by city and category
- **City-Based Filtering** - Visual city cards with popular Indian cities
- **Category Filtering** - Filter by vendor type (venues, photographers, etc.)
- **Vendor Cards** - Rich cards with ratings, pricing, and services
- **Authentication** - Login/register with mock backend
- **Modern UI** - Styled with gradients, animations, and hover effects

## 🌟 **How to Use**

### Navigation
- Click on **"Venues"** in the header to see wedding venues
- Use the **category cards** on the home page to browse different vendor types
- Click **"Find Vendors"** to see all vendors with filtering options

### Filtering Vendors
1. Go to any vendor listing page
2. Use the **search bar** to find specific vendors
3. Apply **city filters** by clicking on city cards
4. Use **category filters** to narrow down vendor types
5. Switch between **Grid** and **List** views

### User Authentication
1. Click **"Sign Up"** to create an account
2. Fill in your details (mock data is fine)
3. Login with your credentials
4. See personalized AI recommendations on the home page

## 🛠️ **Development Commands**

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (advanced users only)
npm run eject
```

## 🎨 **Customization**

### Colors & Theme
Edit `src/App.js` to modify the theme:
```javascript
const theme = {
  colors: {
    primary: '#8B4513',    // Change primary color
    secondary: '#CD853F',   // Change secondary color
    // ... other colors
  }
};
```

### Mock Data
Update vendor data in `src/pages/VendorList/VendorList.js`:
```javascript
const mockVendors = [
  // Add your own vendor data here
];
```

### Add New Cities
Edit `src/components/Filters/CityFilter.js`:
```javascript
const popularCities = [
  { name: 'YourCity', icon: '🏢' },
  // Add more cities
];
```

## 🔧 **Technical Details**

### Project Structure
```
src/
├── components/
│   ├── Layout/          # Header, Footer, Layout
│   ├── Filters/         # City and Category filters
│   ├── VendorCard/      # Vendor card component
│   └── UI/              # Reusable UI components
├── pages/
│   ├── Home/            # Home page components
│   ├── Login/           # Authentication pages
│   ├── VendorList/      # Vendor listing page
│   └── ...
├── contexts/
│   └── AuthContext.js   # User authentication state
├── styles/
│   └── global.css       # Global styles
└── App.js               # Main app component
```

### Key Technologies
- **React 18** with Hooks
- **React Router** for navigation
- **Styled Components** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Context API** for state management

## 🌐 **URLs That Work**

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/vendors/all/wedding-venues` - Wedding venues (like WedMeGood)
- `/vendors/all/wedding-photographers` - Photographers
- `/vendors/all/wedding-decorators` - Decorators
- `/vendors/all/wedding-catering` - Catering services
- `/vendors` - All vendors with filtering
- `/dashboard` - User dashboard (requires login)

## 🚨 **Troubleshooting**

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   # Or start on different port
   PORT=3001 npm start
   ```

2. **Dependencies issues:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Browser not opening:**
   - Manually go to `http://localhost:3000`
   - Check if port 3000 is available

### Need Help?
- Check the browser console for errors
- Ensure all dependencies are installed
- Make sure you're using Node.js v14+

## 🎉 **You're Ready!**

Your Vivahly wedding planning app is now ready to use! 

**Next Steps:**
1. Explore the different pages
2. Try the search and filtering features
3. Create an account to see AI recommendations
4. Customize the theme and add your own vendor data
5. Deploy to production when ready

Enjoy planning the perfect wedding with Vivahly! 💍✨
