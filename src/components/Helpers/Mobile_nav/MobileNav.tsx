import { MdDashboard, MdSwapHoriz, MdWallet } from 'react-icons/md';
import './Mobile.css';
import { useNavigate } from 'react-router-dom';
const MobileNav: React.FC = () => {
  const navigate = useNavigate();
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
        src="https://randomuser.me/api/portraits/lego/5.jpg"
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
