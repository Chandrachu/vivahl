import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Heart, 
  MessageCircle, 
  Users, 
  CheckCircle, 
  Clock,
  Star,
  Plus,
  ArrowRight,
  TrendingUp,
  Gift,
  Bell,
  MapPin,
  Phone,
  Camera,
  Utensils,
  Music,
  Flower,
  Car,
  Crown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const WelcomeHeader = styled(motion.div)`
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

const WelcomeContent = styled.div`
  position: relative;
  z-index: 2;
  
  h1 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
  
  .icon {
    background: ${props => props.color || props.theme.colors.primary};
    color: white;
    padding: 0.75rem;
    border-radius: 12px;
    margin: 0 auto 1rem;
    width: fit-content;
  }
  
  .number {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.gray};
    font-weight: 500;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DashboardCard = styled(motion.div)`
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
  justify-content: between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.3rem;
    color: ${props => props.theme.colors.text};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const TaskList = styled.div`
  .task-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: ${props => props.theme.colors.background};
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.theme.colors.lightGray};
    }
    
    .task-icon {
      background: ${props => props.theme.colors.primary};
      color: white;
      padding: 0.5rem;
      border-radius: 8px;
    }
    
    .task-content {
      flex: 1;
      
      .title {
        font-size: 1rem;
        color: ${props => props.theme.colors.text};
        margin-bottom: 0.2rem;
        font-weight: 500;
      }
      
      .due-date {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.gray};
      }
    }
    
    .task-priority {
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
      
      &.high {
        background: #FEE2E2;
        color: #DC2626;
      }
      
      &.medium {
        background: #FEF3C7;
        color: #D97706;
      }
      
      &.low {
        background: #D1FAE5;
        color: #059669;
      }
    }
  }
`;

const ProgressSection = styled.div`
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.colors.lightGray};
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
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
  margin: 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
`;

const CategoryCard = styled.div`
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
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
  
  .count {
    font-size: 0.7rem;
    color: ${props => props.theme.colors.gray};
  }
`;

const ActivityFeed = styled.div`
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

const BudgetOverview = styled.div`
  .budget-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: ${props => props.theme.colors.background};
    border-radius: 12px;
    
    .category {
      font-size: 0.9rem;
      color: ${props => props.theme.colors.text};
      font-weight: 500;
    }
    
    .amount {
      font-size: 1rem;
      color: ${props => props.theme.colors.primary};
      font-weight: 600;
    }
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const weddingProgress = 68;
  const daysToWedding = 142;
  const totalBudget = 500000;
  const usedBudget = 340000;

  const upcomingTasks = [
    { id: 1, title: 'Finalize catering menu', dueDate: '2 days', priority: 'high', icon: Utensils },
    { id: 2, title: 'Book wedding photographer', dueDate: '1 week', priority: 'high', icon: Camera },
    { id: 3, title: 'Send invitations', dueDate: '2 weeks', priority: 'medium', icon: Gift },
    { id: 4, title: 'Venue decoration planning', dueDate: '3 weeks', priority: 'medium', icon: Flower },
    { id: 5, title: 'Transportation booking', dueDate: '1 month', priority: 'low', icon: Car }
  ];

  const vendorCategories = [
    { name: 'Venues', icon: '🏛️', count: 3 },
    { name: 'Photos', icon: '📸', count: 2 },
    { name: 'Catering', icon: '🍽️', count: 4 },
    { name: 'Decor', icon: '🌸', count: 1 },
    { name: 'Music', icon: '🎵', count: 2 },
    { name: 'Makeup', icon: '💄', count: 1 }
  ];

  const recentActivity = [
    { title: 'Added Royal Palace to wishlist', time: '2 hours ago', icon: Heart },
    { title: 'Booked consultation with Perfect Shots', time: '1 day ago', icon: Calendar },
    { title: 'Reviewed Floral Dreams proposal', time: '2 days ago', icon: Star },
    { title: 'Updated guest list', time: '3 days ago', icon: Users }
  ];

  const budgetBreakdown = [
    { category: 'Venue', amount: '₹1,50,000' },
    { category: 'Catering', amount: '₹1,20,000' },
    { category: 'Photography', amount: '₹70,000' },
    { category: 'Decoration', amount: '₹50,000' },
    { category: 'Others', amount: '₹30,000' }
  ];

  return (
    <DashboardContainer>
      <WelcomeHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WelcomeContent>
          <h1>Welcome back, {user?.name}! <Sparkles size={32} /></h1>
          <p>Your wedding planning journey continues. {daysToWedding} days to go!</p>
        </WelcomeContent>
      </WelcomeHeader>

      <QuickStats>
        <StatCard
          color="#8B4513"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="icon">
            <Calendar size={24} />
          </div>
          <div className="number">{daysToWedding}</div>
          <div className="label">Days to Go</div>
        </StatCard>

        <StatCard
          color="#059669"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="icon">
            <CheckCircle size={24} />
          </div>
          <div className="number">{weddingProgress}%</div>
          <div className="label">Complete</div>
        </StatCard>

        <StatCard
          color="#DC2626"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="icon">
            <DollarSign size={24} />
          </div>
          <div className="number">₹{(usedBudget/1000).toFixed(0)}k</div>
          <div className="label">Budget Used</div>
        </StatCard>

        <StatCard
          color="#7C3AED"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="icon">
            <Heart size={24} />
          </div>
          <div className="number">12</div>
          <div className="label">Wishlist Items</div>
        </StatCard>
      </QuickStats>

      <DashboardGrid>
        <MainContent>
          <DashboardCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <CardHeader>
              <h3>
                <Clock size={20} />
                Upcoming Tasks
              </h3>
              <ActionButton onClick={() => navigate('/tasks')}>
                View All
                <ArrowRight size={16} />
              </ActionButton>
            </CardHeader>
            
            <TaskList>
              {upcomingTasks.slice(0, 4).map(task => (
                <div key={task.id} className="task-item">
                  <task.icon className="task-icon" size={16} />
                  <div className="task-content">
                    <div className="title">{task.title}</div>
                    <div className="due-date">Due in {task.dueDate}</div>
                  </div>
                  <div className={`task-priority ${task.priority}`}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </TaskList>
          </DashboardCard>

          <DashboardCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <CardHeader>
              <h3>
                <TrendingUp size={20} />
                Wedding Progress
              </h3>
            </CardHeader>
            
            <ProgressSection>
              <ProgressBar>
                <ProgressFill progress={weddingProgress} />
              </ProgressBar>
              <ProgressText>
                {weddingProgress}% of your wedding planning completed
              </ProgressText>
            </ProgressSection>

            <CategoryGrid>
              {vendorCategories.map(category => (
                <CategoryCard key={category.name} onClick={() => navigate('/vendors')}>
                  <div className="icon">{category.icon}</div>
                  <div className="label">{category.name}</div>
                  <div className="count">{category.count} saved</div>
                </CategoryCard>
              ))}
            </CategoryGrid>
          </DashboardCard>
        </MainContent>

        <Sidebar>
          <DashboardCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CardHeader>
              <h3>
                <DollarSign size={20} />
                Budget Overview
              </h3>
            </CardHeader>
            
            <ProgressSection>
              <ProgressBar>
                <ProgressFill progress={(usedBudget/totalBudget) * 100} />
              </ProgressBar>
              <ProgressText>
                ₹{(usedBudget/1000).toFixed(0)}k of ₹{(totalBudget/1000).toFixed(0)}k used
              </ProgressText>
            </ProgressSection>

            <BudgetOverview>
              {budgetBreakdown.map(item => (
                <div key={item.category} className="budget-item">
                  <div className="category">{item.category}</div>
                  <div className="amount">{item.amount}</div>
                </div>
              ))}
            </BudgetOverview>
          </DashboardCard>

          <DashboardCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CardHeader>
              <h3>
                <Bell size={20} />
                Recent Activity
              </h3>
            </CardHeader>
            
            <ActivityFeed>
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <activity.icon className="activity-icon" size={16} />
                  <div className="activity-content">
                    <div className="title">{activity.title}</div>
                    <div className="time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </ActivityFeed>
          </DashboardCard>
        </Sidebar>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
