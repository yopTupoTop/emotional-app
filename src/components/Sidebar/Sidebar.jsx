import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        <div className={styles.sidebarLeft}>
          {location.pathname === '/track' ? (
            <>
              <a href="#track-section" className={styles.navLink}>TRACK</a>
              <a href="#statistic" className={styles.navLink}>STATISTIC</a>
            </>
          ) : (
            <>
              <a href="#hero" className={styles.navLink} onClick={handleHomeClick}>HOME</a>
              <a href="#info" className={styles.navLink} onClick={handleAboutClick}>ABOUT PROJECT</a>
            </>
          )}
        </div>
        <div className={styles.sidebarRight}>
          {isAuthenticated ? (
            <button className={styles.signInBtn} onClick={handleLogout}>SIGN OUT</button>
          ) : (
            <Link to="/auth" className={styles.signInBtn}>SIGN IN</Link>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;