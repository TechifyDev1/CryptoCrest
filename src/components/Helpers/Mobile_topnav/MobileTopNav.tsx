import { BiArrowFromLeft } from 'react-icons/bi';
import './Mobile.css';
const MobileTopNav: React.FC<{ currentpage: string }> = ({ currentpage }) => {
    return (
        <nav className="mobile-topnav">
            <div className="back-arrow">
                <BiArrowFromLeft size={25} />
            </div>
            <div className="current-page">
                {currentpage}
            </div>
        </nav>
    );
}

export default MobileTopNav;
