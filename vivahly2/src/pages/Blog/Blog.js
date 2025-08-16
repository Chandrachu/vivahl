import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, User, Clock, Heart, Share2, MessageCircle, Eye, TrendingUp, BookOpen, X, ChevronDown, ChevronRight } from 'lucide-react';

const BlogContainer = styled.div`
  min-height: 100vh;
  padding: 80px 20px 40px;
  background: ${props => props.theme.colors.background};
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  position: relative;
`;

const BlogTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.accent};
    border-radius: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const BlogSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BlogStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 5px;
  }
  
  p {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
  }
`;

const SearchSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 30px;
  font-size: 1rem;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
`;

const SearchIcon = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FilterControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const FilterDropdown = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.showAll ? 'flex' : 'none'};
    
    &.mobile-visible {
      display: flex;
      
      button:nth-child(n+6) {
        display: ${props => props.showAll ? 'block' : 'none'};
      }
    }
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 10px;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'grid' ? 'repeat(auto-fit, minmax(350px, 1fr))' : '1fr'};
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: url(${props => props.src}) center/cover;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.1), transparent);
  }
`;

const BlogContent = styled.div`
  padding: 25px;
`;

const BlogCategory = styled.span`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogCardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin: 15px 0 10px;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BlogActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &.liked {
    color: ${props => props.theme.colors.error};
  }
`;

const TrendingBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LoadMoreButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 40px auto 0;
  display: block;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const BlogModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 30px;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ModalBody = styled.div`
  padding: 30px;
  
  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 15px;
  }
  
  p {
    color: ${props => props.theme.colors.text};
    line-height: 1.7;
    margin-bottom: 20px;
  }
`;

const RelatedPosts = styled.div`
  margin-top: 60px;
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.8rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 30px;
    text-align: center;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const RelatedCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const SortDropdown = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const SortMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadows.medium};
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
`;

const SortOption = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
  
  &.active {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const Blog = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const blogCategories = [
    { key: 'all', label: 'All Posts' },
    { key: 'bridal-makeup-beauty', label: 'Bridal Makeup & Beauty' },
    { key: 'wedding-songs', label: 'Wedding Songs' },
    { key: 'bridal-hairstyles', label: 'Bridal Hairstyles' },
    { key: 'indian-wedding-decor', label: 'Indian Wedding Decor' },
    { key: 'bridal-style-advice', label: 'Bridal Style Advice' },
    { key: 'indian-wedding-favours', label: 'Indian Wedding Favours' },
    { key: 'budget-weddings', label: 'Budget Weddings' },
    { key: 'south-indian-wedding', label: 'South Indian Wedding' },
    { key: 'real-wedding', label: 'Real Wedding' },
    { key: 'mehendi-ideas', label: 'Mehendi Ideas' },
    { key: 'indian-wedding-ideas', label: 'Indian Wedding Ideas' },
    { key: 'honeymoons', label: 'Honeymoons' }
  ];

  // Sample blog posts data
  const samplePosts = [
    {
      id: 1,
      title: "50 of the Best Bollywood Wedding Songs",
      excerpt: "From classic melodies to contemporary hits, discover the perfect soundtrack for your special day.",
      category: "wedding-songs",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Wedding Team",
      date: "2024-01-15",
      readTime: "5 min read",
      views: 1250,
      likes: 89,
      comments: 34,
      trending: true,
      fullContent: "Music forms the soul of any Indian wedding celebration. From the emotional bidaai songs to the energetic sangeet performances, the right soundtrack can make your wedding unforgettable. Here are 50 of the most popular Bollywood wedding songs that will create the perfect ambiance for your special day..."
    },
    {
      id: 2,
      title: "Best Indian Bridal Entry Songs That Create an Impact",
      excerpt: "Make your grand entrance unforgettable with these soul-stirring bridal entry songs.",
      category: "wedding-songs",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Music Editor",
      date: "2024-01-12",
      readTime: "4 min read",
      views: 980,
      likes: 67,
      comments: 28,
      trending: false,
      fullContent: "Your bridal entry is one of the most magical moments of your wedding day. The right song can elevate this moment from beautiful to absolutely breathtaking. Here are our top picks for bridal entry songs that will leave everyone mesmerized..."
    },
    {
      id: 3,
      title: "Latest Bridal Blouse Designs",
      excerpt: "Discover the most stunning and trendy bridal blouse designs for your wedding day.",
      category: "bridal-style-advice",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Fashion Expert",
      date: "2024-01-10",
      readTime: "6 min read",
      views: 1500,
      likes: 156,
      comments: 45,
      trending: true,
      fullContent: "The bridal blouse is as important as the saree itself. It's the canvas that brings your bridal look together. From traditional designs to contemporary cuts, here are the latest bridal blouse designs that are trending this season..."
    },
    {
      id: 4,
      title: "Best Marriage Dates in 2025 - Auspicious Hindu Wedding Dates",
      excerpt: "Plan your perfect wedding with our comprehensive guide to auspicious dates in 2025.",
      category: "indian-wedding-ideas",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Astrology Team",
      date: "2024-01-08",
      readTime: "8 min read",
      views: 2100,
      likes: 234,
      comments: 67,
      trending: true,
      fullContent: "Choosing the right wedding date is crucial in Hindu traditions. Our astrology experts have compiled a comprehensive list of the most auspicious dates for marriages in 2025, along with the significance of each date..."
    },
    {
      id: 5,
      title: "Best Bridal Hairstyles for Indian Weddings",
      excerpt: "From traditional braids to modern updos, find the perfect hairstyle for your wedding day.",
      category: "bridal-hairstyles",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Hair Stylist",
      date: "2024-01-05",
      readTime: "5 min read",
      views: 1320,
      likes: 98,
      comments: 52,
      trending: false,
      fullContent: "Your wedding hairstyle should complement your outfit and face shape while reflecting your personal style. Whether you prefer traditional braids or modern updos, here are the best bridal hairstyles that are perfect for Indian weddings..."
    },
    {
      id: 6,
      title: "30 Most Awesome Groom Entry Songs Ever",
      excerpt: "Make your groom's entrance epic with these energetic and memorable songs.",
      category: "wedding-songs",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Music Editor",
      date: "2024-01-03",
      readTime: "4 min read",
      views: 890,
      likes: 76,
      comments: 29,
      trending: false,
      fullContent: "The groom's entry should be as memorable as the bride's. From traditional dhol beats to modern remixes, here are 30 awesome groom entry songs that will make his entrance absolutely epic..."
    },
    {
      id: 7,
      title: "Best Mehndi Designs for 2024",
      excerpt: "Stunning mehndi patterns that will make your hands look absolutely beautiful.",
      category: "mehendi-ideas",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Mehndi Artist",
      date: "2024-01-01",
      readTime: "7 min read",
      views: 1800,
      likes: 187,
      comments: 78,
      trending: true,
      fullContent: "Mehndi is an integral part of Indian weddings, and choosing the right design is crucial. From intricate bridal patterns to simple elegant designs, here are the best mehndi designs that are trending in 2024..."
    },
    {
      id: 8,
      title: "Temple Weddings Are Going Viral and We're All For It",
      excerpt: "Discover why temple weddings are becoming the preferred choice for modern couples.",
      category: "indian-wedding-ideas",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Wedding Team",
      date: "2023-12-28",
      readTime: "6 min read",
      views: 1100,
      likes: 92,
      comments: 41,
      trending: false,
      fullContent: "Temple weddings are making a comeback in a big way. More couples are choosing the sacred and spiritual environment of temples for their wedding ceremonies. Here's why temple weddings are trending and how to plan one..."
    },
    {
      id: 9,
      title: "Budget-Friendly Wedding Decoration Ideas",
      excerpt: "Create stunning wedding decorations without breaking the bank with these creative ideas.",
      category: "indian-wedding-decor",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Decor Expert",
      date: "2023-12-25",
      readTime: "8 min read",
      views: 1650,
      likes: 142,
      comments: 56,
      trending: false,
      fullContent: "You don't need to spend a fortune to create beautiful wedding decorations. With some creativity and smart planning, you can create stunning decor that looks expensive but fits your budget..."
    },
    {
      id: 10,
      title: "Destination Wedding Planning Guide",
      excerpt: "Everything you need to know about planning a perfect destination wedding in India.",
      category: "indian-wedding-ideas",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Travel Wedding Expert",
      date: "2023-12-20",
      readTime: "10 min read",
      views: 2200,
      likes: 198,
      comments: 85,
      trending: true,
      fullContent: "Destination weddings are becoming increasingly popular among Indian couples. From Goa beaches to Rajasthan palaces, here's your complete guide to planning an unforgettable destination wedding..."
    }
  ];

  useEffect(() => {
    setBlogPosts(samplePosts);
  }, []);

  const sortOptions = [
    { key: 'newest', label: 'Newest First' },
    { key: 'oldest', label: 'Oldest First' },
    { key: 'popular', label: 'Most Popular' },
    { key: 'trending', label: 'Trending' }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const openPost = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 6);
  };

  let filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort posts
  filteredPosts = filteredPosts.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'popular':
        return b.views - a.views;
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const totalPosts = blogPosts.length;
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);

  const getRelatedPosts = (currentPost) => {
    return blogPosts
      .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
      .slice(0, 3);
  };

  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>Wedding Blog</BlogTitle>
        <BlogSubtitle>
          Discover the latest trends, tips, and inspiration for your perfect wedding
        </BlogSubtitle>
        <BlogStats>
          <StatItem>
            <h3>{totalPosts}</h3>
            <p>Total Posts</p>
          </StatItem>
          <StatItem>
            <h3>{totalViews.toLocaleString()}</h3>
            <p>Total Views</p>
          </StatItem>
          <StatItem>
            <h3>{totalLikes}</h3>
            <p>Total Likes</p>
          </StatItem>
        </BlogStats>
      </BlogHeader>

      <SearchSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
        </SearchBar>
      </SearchSection>

      <FilterSection>
        <FilterControls>
          <FilterButton onClick={() => setShowAllCategories(!showAllCategories)}>
            <Filter size={16} />
            Categories
            {showAllCategories ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </FilterButton>
          <SortDropdown>
            <SortButton onClick={() => setShowSortMenu(!showSortMenu)}>
              Sort by: {sortOptions.find(opt => opt.key === sortBy)?.label}
              <ChevronDown size={16} />
            </SortButton>
            <AnimatePresence>
              {showSortMenu && (
                <SortMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {sortOptions.map(option => (
                    <SortOption
                      key={option.key}
                      className={sortBy === option.key ? 'active' : ''}
                      onClick={() => {
                        setSortBy(option.key);
                        setShowSortMenu(false);
                      }}
                    >
                      {option.label}
                    </SortOption>
                  ))}
                </SortMenu>
              )}
            </AnimatePresence>
          </SortDropdown>
        </FilterControls>
        <ViewToggle>
          <ViewButton 
            active={viewMode === 'grid'} 
            onClick={() => setViewMode('grid')}
          >
            <BookOpen size={16} />
          </ViewButton>
          <ViewButton 
            active={viewMode === 'list'} 
            onClick={() => setViewMode('list')}
          >
            <TrendingUp size={16} />
          </ViewButton>
        </ViewToggle>
      </FilterSection>

      <CategoryFilter showAll={showAllCategories} className="mobile-visible">
        {blogCategories.map(cat => (
          <FilterButton
            key={cat.key}
            active={selectedCategory === cat.key}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </FilterButton>
        ))}
      </CategoryFilter>

      <BlogGrid viewMode={viewMode}>
        {displayedPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openPost(post)}
          >
            {post.trending && (
              <TrendingBadge>
                <TrendingUp size={14} />
                Trending
              </TrendingBadge>
            )}
            <BlogImage src={post.image} alt={post.title} />
            <BlogContent>
              <BlogCategory>{post.category.replace('-', ' ')}</BlogCategory>
              <BlogCardTitle>{post.title}</BlogCardTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <BlogMeta>
                <AuthorInfo>
                  <User size={14} />
                  <span>{post.author}</span>
                </AuthorInfo>
                <div>
                  <Calendar size={14} />
                  <span>{post.date} • {post.readTime}</span>
                </div>
              </BlogMeta>
              <BlogActions>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <ActionButton
                    className={likedPosts.includes(post.id) ? 'liked' : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <Heart size={16} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </ActionButton>
                  <ActionButton onClick={(e) => {
                    e.stopPropagation();
                    handleShare(post);
                  }}>
                    <Share2 size={16} />
                    Share
                  </ActionButton>
                  <ActionButton>
                    <MessageCircle size={16} />
                    {post.comments}
                  </ActionButton>
                </div>
                <ActionButton>
                  <Eye size={16} />
                  {post.views}
                </ActionButton>
              </BlogActions>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>

      {displayedPosts.length < filteredPosts.length && (
        <LoadMoreButton onClick={loadMorePosts}>
          Load More Posts
        </LoadMoreButton>
      )}

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePost}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <CloseButton onClick={closePost}>
                  <X size={24} />
                </CloseButton>
                <BlogCategory>{selectedPost.category.replace('-', ' ')}</BlogCategory>
                <h2>{selectedPost.title}</h2>
                <BlogMeta>
                  <AuthorInfo>
                    <User size={14} />
                    <span>{selectedPost.author}</span>
                  </AuthorInfo>
                  <div>
                    <Calendar size={14} />
                    <span>{selectedPost.date} • {selectedPost.readTime}</span>
                  </div>
                </BlogMeta>
              </ModalHeader>
              <ModalBody>
                <BlogImage src={selectedPost.image} style={{ marginBottom: '20px', height: '300px' }} />
                <p>{selectedPost.fullContent}</p>
                <BlogActions>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <ActionButton
                      className={likedPosts.includes(selectedPost.id) ? 'liked' : ''}
                      onClick={() => handleLike(selectedPost.id)}
                    >
                      <Heart size={16} />
                      {selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)}
                    </ActionButton>
                    <ActionButton onClick={() => handleShare(selectedPost)}>
                      <Share2 size={16} />
                      Share
                    </ActionButton>
                    <ActionButton>
                      <MessageCircle size={16} />
                      {selectedPost.comments}
                    </ActionButton>
                  </div>
                  <ActionButton>
                    <Eye size={16} />
                    {selectedPost.views}
                  </ActionButton>
                </BlogActions>
                
                <RelatedPosts>
                  <h3>Related Posts</h3>
                  <RelatedGrid>
                    {getRelatedPosts(selectedPost).map(relatedPost => (
                      <RelatedCard
                        key={relatedPost.id}
                        onClick={() => {
                          setSelectedPost(relatedPost);
                        }}
                      >
                        <BlogImage src={relatedPost.image} style={{ height: '150px' }} />
                        <div style={{ padding: '15px' }}>
                          <h4 style={{ fontSize: '1rem', marginBottom: '10px' }}>{relatedPost.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: '#666' }}>{relatedPost.excerpt.substring(0, 100)}...</p>
                        </div>
                      </RelatedCard>
                    ))}
                  </RelatedGrid>
                </RelatedPosts>
              </ModalBody>
            </ModalContent>
          </BlogModal>
        )}
      </AnimatePresence>
    </BlogContainer>
  );
};

export default Blog;
