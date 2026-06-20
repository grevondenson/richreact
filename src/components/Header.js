import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hero section selectors for different pages
  const getHeroSelector = () => {
    switch (location.pathname) {
      case '/':
        return '.hero-section, .hero, .main-hero, .home-hero';
      case '/curri':
        return '.hero-section, .hero, .curri-hero, .curriculum-hero';
      case '/dashboard':
        return '.hero-section, .hero, .dashboard-hero';
      case '/question':
        return '.hero-section, .hero, .question-hero';
      case '/video':
        return '.hero-section, .hero, .video-hero';
      case '/pricing':
        return '.hero-section, .hero, .pricing-hero';
      default:
        return '.hero-section, .hero, .main-hero';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSelector = getHeroSelector();
      const heroElement = document.querySelector(heroSelector);
      
      if (heroElement) {
        const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
        const scrollPosition = window.scrollY + 100; // Add small buffer
        
        setIsSticky(scrollPosition > heroBottom);
      } else {
        // If no hero section found, make sticky after scrolling down a bit
        setIsSticky(window.scrollY > 200);
      }
    };
  
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, getHeroSelector]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <header className={`main-header${isSticky ? ' sticky' : ''}`}>
      <div className="site-title">RICHMOND TUTORIALS</div>
      <nav>
        {/* Hamburger for mobile */}
        <button
          className="menu-toggle"
          aria-label="Open menu"
          onClick={toggleSidebar}
        >
          &#9776;
        </button>
        {/* Desktop menu */}
        <ul className="main-menu">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/curri">CURRICULA</Link></li>
          <li className="has-dropdown">
            <Link to="/tutorial">TUTOR</Link>
            <ul className="dropdown">
              <li><Link to="/tutorial">LESSONS</Link></li>
              <li><Link to="/pricing">PRICING & BOOKING</Link></li>
            </ul>
          </li>
          <li className="has-dropdown">
            <Link to="/resources">RESOURCES</Link>
            <ul className="dropdown">
              <li className="has-dropdown">
                <Link to="/pdf">PDF</Link>
                <ul className="dropdown">
                  <li><Link to="/ebook">EBOOKS</Link></li>
                  <li><Link to="/notes">REVISION NOTES</Link></li>
                </ul>
              </li>
              <li><Link to="/syllabus">SYLLABUS</Link></li>
              <li><Link to="/exam">EXAM QUESTIONS</Link></li>
              <li className="has-dropdown">
                <Link to="/papers">PAST PAPERS</Link>
                <ul className="dropdown">
                  <li><Link to="/examiner">EXAMINER REPORTS</Link></li>
                </ul>
              </li>
              <li><Link to="/video">VIDEO MATERIAL</Link></li>
            </ul>
          </li>
          <li className="has-dropdown">
            <Link to="/community">COMMUNITY</Link>
            <ul className="dropdown">
              <li><Link to="/community">DISCUSSIONS</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/question">QUESTIONS POST</Link></li>
            </ul>
          </li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li>
            {currentUser ? (
              <div className="user-menu">
                <span className="user-name">{currentUser.displayName || currentUser.email}</span>
                <Link className="auth-btn" to="/dashboard" style={{ marginRight: '8px' }}>DASHBOARD</Link>
                {userRole === 'teacher' && (
                  <Link className="auth-btn" to="/admin" style={{ marginRight: '8px' }}>ADMIN</Link>
                )}
                <button className="auth-btn" onClick={handleLogout}>LOGOUT</button>
              </div>
            ) : (
              <Link className="auth-btn" to="/login">LOGIN</Link>
            )}
          </li>
        </ul>
        {/* Mobile sidebar */}
        <div className={`sidebar${isSidebarOpen ? ' open' : ''}`}>
          <button className="close-btn" aria-label="Close menu" onClick={closeSidebar}>✕</button>
          <ul>
            <li><Link to="/" onClick={closeSidebar}>HOME</Link></li>
            <li><Link to="/curri" onClick={closeSidebar}>CURRICULA</Link></li>
            <li>
              <details>
                <summary>TUTOR</summary>
                <ul>
                  <li><Link to="/tutorial" onClick={closeSidebar}>LESSONS</Link></li>
                  <li><Link to="/pricing" onClick={closeSidebar}>PRICING & BOOKING</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>RESOURCES</summary>
                <ul>
                  <li><Link to="/resources" onClick={closeSidebar}>ALL RESOURCES</Link></li>
                  <li>
                    <details>
                      <summary>PDF</summary>
                      <ul>
                        <li><Link to="/ebook" onClick={closeSidebar}>EBOOKS</Link></li>
                        <li><Link to="/notes" onClick={closeSidebar}>REVISION NOTES</Link></li>
                      </ul>
                    </details>
                  </li>
                  <li><Link to="/syllabus" onClick={closeSidebar}>SYLLABUS</Link></li>
                  <li><Link to="/exam" onClick={closeSidebar}>EXAM QUESTIONS</Link></li>
                  <li>
                    <details>
                      <summary>PAST PAPERS</summary>
                      <ul>
                        <li><Link to="/papers" onClick={closeSidebar}>  PAST PAPERS</Link></li>
                        <li><Link to="/examiner" onClick={closeSidebar}>EXAMINER REPORTS</Link></li>
                      </ul>
                    </details>
                  </li>
                  <li><Link to="/video" onClick={closeSidebar}>VIDEO MATERIAL</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>COMMUNITY</summary>
                <ul>
                  <li><Link to="/community" onClick={closeSidebar}>DISCUSSIONS</Link></li>
                  <li><Link to="/faq" onClick={closeSidebar}>FAQ</Link></li>
                  <li><Link to="/question" onClick={closeSidebar}>QUESTIONS POST</Link></li>
                </ul>
              </details>
            </li>
            <li><Link to="/contact" onClick={closeSidebar}>CONTACT</Link></li>
            <li>
              {currentUser ? (
                <div className="user-menu">
                  <span className="user-name">{currentUser.displayName || currentUser.email}</span>
                  <Link className="auth-btn" to="/dashboard" onClick={closeSidebar} style={{ marginBottom: '8px' }}>DASHBOARD</Link>
                  <button className="auth-btn" onClick={() => { handleLogout(); closeSidebar(); }}>LOGOUT</button>
                </div>
              ) : (
                <Link className="auth-btn" to="/login" onClick={closeSidebar}>LOGIN</Link>
              )}
            </li>
          </ul>
        </div>
        {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      </nav>
    </header>
  );
};

export default Header; 