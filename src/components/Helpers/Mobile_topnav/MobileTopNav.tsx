
import { FaArrowLeft } from 'react-icons/fa6';
import './Mobile.css';
const MobileTopNav: React.FC<{ currentpage: string }> = ({ currentpage }) => {
    return (
        <nav className="mobile-topnav">
            <div className="back-arrow">
                <FaArrowLeft style={{color: 'var(--primary-color)'}} />
            </div>
            <div className="current-page">
                {currentpage}
            </div>
        </nav>
    );
}

export default MobileTopNav;
