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
  const [googlePhotoUrl, setGoolePhotoUrl] = useState<string | null>('');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoolePhotoUrl(user.photoURL);
        setUsername(user.displayName || '');
      }
    });
    unsub();
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
      <div className="profile-info" onClick={() => navigate('/settings')} style={{cursor: "pointer"}}>
          <img src={googlePhotoUrl || "https://www.gravatar.com/avatar/"} alt="profile" style={{borderRadius: "50%", height: "2rem", width: "2rem"}} />
        <span className="username">{username || "User"}</span>
      </div>
    </nav>
  );
};

export default NavBar;
