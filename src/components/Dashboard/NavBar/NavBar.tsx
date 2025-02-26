import React, { Dispatch, SetStateAction } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import './Navbar.css';
import { auth } from '../../../Firebase/firebase-init';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC<{
  togglenav: Dispatch<SetStateAction<boolean>>;
  toggleSideBar: boolean;
}> = ({ togglenav, toggleSideBar }) => {
  const navigate = useNavigate();
  const googlePhotoUrl = auth.currentUser?.photoURL || 'https://randomuser.me/api/portraits/lego/5.jpg';
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
          <img src={googlePhotoUrl} alt="profile" style={{borderRadius: "50%", height: "2rem", width: "2rem"}} />
        <span className="username">{auth.currentUser?.displayName || "User"}</span>
      </div>
    </nav>
  );
};

export default NavBar;
