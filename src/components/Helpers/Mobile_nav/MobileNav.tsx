import { MdDashboard, MdSettings, MdSwapHoriz } from 'react-icons/md';
import './Mobile.css';
const MobileNav: React.FC = () => {
    return (
        <nav className="mobile-nav">
            <MdDashboard size={30} style={{ cursor: 'pointer' }} />
            <MdSwapHoriz size={30} style={{ cursor: 'pointer' }} />
            <MdSettings size={30} style={{ cursor: 'pointer' }} />
        </nav>
    )
}

export default MobileNav;
