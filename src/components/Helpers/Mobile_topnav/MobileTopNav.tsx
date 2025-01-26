
import { FaArrowLeft } from 'react-icons/fa6';
import './Mobile.css';
import { useNavigate } from 'react-router-dom';
const MobileTopNav: React.FC<{ currentpage: string }> = ({ currentpage }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <nav className="mobile-topnav">
            <div className="back-arrow" onClick={goBack}>
                <FaArrowLeft style={{color: 'var(--primary-color)'}} />
            </div>
            <div className="current-page">
                {currentpage}
            </div>
        </nav>
    );
}

export default MobileTopNav;
