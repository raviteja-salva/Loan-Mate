import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  Home, 
  FileText, 
  Calculator, 
  LogOut,
  Menu,
  X,
  Search,
  ArrowUpRight, 
  ArrowDownLeft
} from 'lucide-react'
import { FaRupeeSign as Rupee } from "react-icons/fa";
import { SearchInput, ProfileContainer, ProfileDropdown, UserInfo, UserName, UserEmail, NotificationBadge, IconButton, ProfileButton, Content, Header, HeaderLeft, MenuButton, HeaderRight, Logo, NavSection, NavLink, LogoutButton, SearchContainer, LayoutContainer, Sidebar } from './Layout.Style';


const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const location = useLocation();
  const sidebarWidth = "250px";
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserDetails({
      name: user.name || '',
      email: user.email || ''
    });
  }, []);

  const navItems = [
    { path: "/", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/loan-posts", icon: <FileText size={20} />, label: "Loan Posts" },
    { path: "/loans-given", icon: <ArrowUpRight size={20} />, label: "Loans Given" },
    { path: "/loans-taken", icon: <ArrowDownLeft size={20} />, label: "Loans Taken" },
    { path: "/calculator", icon: <Calculator size={20} />, label: "Interest Calculator" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-container')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <LayoutContainer>
      <Sidebar $sidebarWidth={sidebarWidth} $isOpen={isSidebarOpen}>
        <Logo to="/">
          <Rupee size={28} />
          LoanMate
        </Logo>
        
        <NavSection>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </NavSection>

        <LogoutButton onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </LogoutButton>
      </Sidebar>

      <Header $sidebarWidth={sidebarWidth} $isOpen={isSidebarOpen}>
        <HeaderLeft>
          <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </MenuButton>
        </HeaderLeft>

        <HeaderRight>
          <SearchContainer>
            <Search size={18} color="#9ca3af" />
            <SearchInput placeholder="Search..." />
          </SearchContainer>
          <NotificationBadge>
            <IconButton onClick={() => navigate("/loan-approve")}>
              <Bell size={20} />
            </IconButton>
          </NotificationBadge>
          <ProfileContainer className="profile-container">
            <ProfileButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <User size={20} />
            </ProfileButton>
            <ProfileDropdown $isOpen={isProfileOpen}>
              <UserInfo>
                <UserName>{userDetails.name}</UserName>
                <UserEmail>{userDetails.email}</UserEmail>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </LogoutButton>
            </ProfileDropdown>
          </ProfileContainer>
        </HeaderRight>
      </Header>

      <Content $sidebarWidth={sidebarWidth} $isOpen={isSidebarOpen}>
        {children}
      </Content>
    </LayoutContainer>
  );
};

export default Layout;

