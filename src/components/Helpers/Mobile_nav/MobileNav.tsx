import { MdDashboard, MdSwapHoriz, MdWallet } from 'react-icons/md';
import './Mobile.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../../../Firebase/firebase-init';
const MobileNav: React.FC = () => {
  const [userPic, setUserPic] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setUserPic("https://randomuser.me/api/portraits/lego/5.jpg");
    } else {
      setUserPic(user.photoURL || "https://randomuser.me/api/portraits/lego/5.jpg");
    }
  }, []);
  return (
    <nav className="mobile-nav">
      <MdDashboard
        size={30}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      />
      <MdWallet
        size={30}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/portfolio')}
      />
      <MdSwapHoriz
        size={30}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/transactions')}
      />
      <img
        onClick={() => navigate('/settings')}
        src={userPic}
        style={{
          height: '2rem',
          width: '2rem',
          borderRadius: '50%',
          objectFit: 'contain',
        }}
        alt="settings"
      />
    </nav>
  );
};

export default MobileNav;
