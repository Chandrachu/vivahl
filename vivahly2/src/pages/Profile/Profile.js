import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit3, 
  Camera, 
  Heart, 
  Star,
  Settings,
  LogOut,
  Save,
  X,
  Eye,
  Award,
  Users,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const ProfileHeader = styled(motion.div)`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const ProfileHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CameraOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const ProfileSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.accent};
  }
  
  .label {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.primary : 'white'};
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.3);
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.3rem;
    color: ${props => props.theme.colors.text};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  
  .icon {
    color: ${props => props.theme.colors.primary};
    background: white;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .content {
    flex: 1;
    
    .label {
      font-size: 0.9rem;
      color: ${props => props.theme.colors.gray};
      margin-bottom: 0.2rem;
    }
    
    .value {
      font-size: 1rem;
      color: ${props => props.theme.colors.text};
      font-weight: 500;
    }
  }
`;

const WeddingProgress = styled.div`
  margin-top: 1rem;
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.colors.lightGray};
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  text-align: center;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
`;

const WishlistItem = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text};
  }
`;

const RecentActivity = styled.div`
  .activity-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: ${props => props.theme.colors.background};
    border-radius: 12px;
    
    .activity-icon {
      background: ${props => props.theme.colors.primary};
      color: white;
      padding: 0.5rem;
      border-radius: 8px;
    }
    
    .activity-content {
      flex: 1;
      
      .title {
        font-size: 0.9rem;
        color: ${props => props.theme.colors.text};
        margin-bottom: 0.2rem;
      }
      
      .time {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.gray};
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.3rem;
    color: ${props => props.theme.colors.text};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }
`;

const SaveButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    weddingDate: '',
    location: '',
    partner: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    // Save profile changes
    console.log('Saving profile:', editData);
    setIsEditModalOpen(false);
  };

  const weddingProgress = 65; // Mock progress
  const daysToWedding = 145; // Mock days

  return (
    <ProfileContainer>
      <ProfileHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileHeaderContent>
          <ProfileImageContainer>
            <span>{user?.avatar || '👤'}</span>
            <CameraOverlay>
              <Camera size={16} />
            </CameraOverlay>
          </ProfileImageContainer>
          
          <ProfileInfo>
            <ProfileName>{user?.name || 'Your Name'}</ProfileName>
            <ProfileSubtitle>
              {daysToWedding > 0 ? `${daysToWedding} days until your big day!` : 'Planning your perfect wedding'}
            </ProfileSubtitle>
            
            <ProfileStats>
              <StatItem>
                <div className="number">12</div>
                <div className="label">Vendors</div>
              </StatItem>
              <StatItem>
                <div className="number">8</div>
                <div className="label">Wishlist</div>
              </StatItem>
              <StatItem>
                <div className="number">5</div>
                <div className="label">Bookings</div>
              </StatItem>
              <StatItem>
                <div className="number">{weddingProgress}%</div>
                <div className="label">Complete</div>
              </StatItem>
            </ProfileStats>
          </ProfileInfo>
          
          <ProfileActions>
            <ActionButton primary onClick={() => setIsEditModalOpen(true)}>
              <Edit3 size={16} />
              Edit Profile
            </ActionButton>
            <ActionButton onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </ActionButton>
          </ProfileActions>
        </ProfileHeaderContent>
      </ProfileHeader>

      <ProfileContent>
        <ProfileCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CardHeader>
            <h3>
              <User size={20} />
              Personal Information
            </h3>
            <EditButton onClick={() => setIsEditModalOpen(true)}>
              <Edit3 size={16} />
            </EditButton>
          </CardHeader>
          
          <InfoItem>
            <Mail className="icon" size={16} />
            <div className="content">
              <div className="label">Email</div>
              <div className="value">{user?.email || 'Not provided'}</div>
            </div>
          </InfoItem>
          
          <InfoItem>
            <Phone className="icon" size={16} />
            <div className="content">
              <div className="label">Phone</div>
              <div className="value">+91 9876543210</div>
            </div>
          </InfoItem>
          
          <InfoItem>
            <MapPin className="icon" size={16} />
            <div className="content">
              <div className="label">Location</div>
              <div className="value">Mumbai, Maharashtra</div>
            </div>
          </InfoItem>
          
          <InfoItem>
            <Calendar className="icon" size={16} />
            <div className="content">
              <div className="label">Wedding Date</div>
              <div className="value">{user?.weddingDate || 'December 15, 2024'}</div>
            </div>
          </InfoItem>
        </ProfileCard>

        <ProfileCard
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CardHeader>
            <h3>
              <Star size={20} />
              Wedding Progress
            </h3>
          </CardHeader>
          
          <WeddingProgress>
            <ProgressBar>
              <ProgressFill progress={weddingProgress} />
            </ProgressBar>
            <ProgressText>
              {weddingProgress}% of planning completed
            </ProgressText>
          </WeddingProgress>
          
          <InfoItem>
            <Award className="icon" size={16} />
            <div className="content">
              <div className="label">Tasks Completed</div>
              <div className="value">13 of 20</div>
            </div>
          </InfoItem>
          
          <InfoItem>
            <Users className="icon" size={16} />
            <div className="content">
              <div className="label">Guest List</div>
              <div className="value">250 invited</div>
            </div>
          </InfoItem>
          
          <InfoItem>
            <Clock className="icon" size={16} />
            <div className="content">
              <div className="label">Next Task</div>
              <div className="value">Finalize catering menu</div>
            </div>
          </InfoItem>
        </ProfileCard>

        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CardHeader>
            <h3>
              <Heart size={20} />
              Wishlist
            </h3>
          </CardHeader>
          
          <WishlistGrid>
            <WishlistItem onClick={() => navigate('/wishlist')}>
              <div className="icon">🏛️</div>
              <div className="label">Venues</div>
            </WishlistItem>
            <WishlistItem onClick={() => navigate('/wishlist')}>
              <div className="icon">📸</div>
              <div className="label">Photos</div>
            </WishlistItem>
            <WishlistItem onClick={() => navigate('/wishlist')}>
              <div className="icon">🌸</div>
              <div className="label">Decor</div>
            </WishlistItem>
            <WishlistItem onClick={() => navigate('/wishlist')}>
              <div className="icon">🍰</div>
              <div className="label">Catering</div>
            </WishlistItem>
          </WishlistGrid>
        </ProfileCard>

        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <CardHeader>
            <h3>
              <MessageCircle size={20} />
              Recent Activity
            </h3>
          </CardHeader>
          
          <RecentActivity>
            <div className="activity-item">
              <Heart className="activity-icon" size={16} />
              <div className="activity-content">
                <div className="title">Added Royal Palace to wishlist</div>
                <div className="time">2 hours ago</div>
              </div>
            </div>
            <div className="activity-item">
              <Eye className="activity-icon" size={16} />
              <div className="activity-content">
                <div className="title">Viewed Perfect Shots Studio</div>
                <div className="time">1 day ago</div>
              </div>
            </div>
            <div className="activity-item">
              <Star className="activity-icon" size={16} />
              <div className="activity-content">
                <div className="title">Rated Floral Dreams 5 stars</div>
                <div className="time">3 days ago</div>
              </div>
            </div>
          </RecentActivity>
        </ProfileCard>
      </ProfileContent>

      <Modal isOpen={isEditModalOpen}>
        <ModalContent>
          <ModalHeader>
            <h3>Edit Profile</h3>
            <CloseButton onClick={() => setIsEditModalOpen(false)}>
              <X size={20} />
            </CloseButton>
          </ModalHeader>
          
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Wedding Date</Label>
            <Input
              type="date"
              value={editData.weddingDate}
              onChange={(e) => setEditData({...editData, weddingDate: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({...editData, location: e.target.value})}
            />
          </FormGroup>
          
          <SaveButton onClick={handleSave}>
            <Save size={16} style={{ marginRight: '0.5rem' }} />
            Save Changes
          </SaveButton>
        </ModalContent>
      </Modal>
    </ProfileContainer>
  );
};

export default Profile;
