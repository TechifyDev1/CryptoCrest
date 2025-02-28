import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import './Navbar.css';
import { auth } from '../../../Firebase/firebase-init';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const NavBar: React.FC<{
  togglenav: Dispatch<SetStateAction<boolean>>;
  toggleSideBar: boolean;
}> = ({ togglenav, toggleSideBar }) => {
  const [googlePhotoUrl, setGoolePhotoUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('User');
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoolePhotoUrl(user.photoURL || null); // Ensure it's either null or a URL
        setUsername(user.displayName || 'User'); // Fallback to 'User' if displayName is empty
      }
    });

    return () => unsub();
  }, []);

  return (
    <nav className="top-nav" style={{ width: toggleSideBar ? '' : '90%' }}>
      <div onClick={() => togglenav((prev) => !prev)} className="menu-icon">
        <FaBarsStaggered
          size={25}
          style={{ color: 'var(--primary-color)' }}
          className="bar"
        />
      </div>
      <div
        className="profile-info"
        onClick={() => navigate('/settings')}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={googlePhotoUrl || 'https://www.gravatar.com/avatar/'} // Default avatar if not available
          alt="profile"
          style={{
            borderRadius: '50%',
            height: '2rem',
            width: '2rem',
            objectFit: 'cover',
          }}
        />
        <span className="username">{username}</span>
      </div>
    </nav>
  );
};

export default NavBar;
