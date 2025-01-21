import { HiLogout } from "react-icons/hi";
import { HiCamera, HiEnvelope, HiKey, HiPencil } from "react-icons/hi2";
import { TbToggleLeft } from "react-icons/tb";
import './Main.css';

const MainSection: React.FC = () => {
    return (
        <div className="main-section">
            <div className="profile-header">
                <div className="img-edit">
                    <img src="https://randomuser.me/api/portraits/lego/5.jpg" alt="profile" />
                    <button className="edit-img">
                        <HiCamera size={20} style={{ color: 'var(--primary-color)' }} />
                    </button>
                </div>
                <div className="username-edit">
                    <h1>John Doe</h1>
                    <button className="edit-username">
                        <HiPencil size={20} style={{ color: 'var(--primary-color)' }} />
                    </button>
                </div>
            </div>
            <div className="main-settings">
                <div className="setting">
                    <div className="icon-div">
                        <HiEnvelope size={20} style={{ color: 'var(--primary-color)' }} />
                    </div>
                    <p>Edit Email</p>
                </div>
                <div className="setting">
                    <div className="icon-div">
                        <HiKey size={20} style={{ color: 'var(--primary-color)' }} />
                    </div>
                    <p>Change Password</p>
                </div>
                <div className="setting">
                    <div className="icon-div">
                        <TbToggleLeft size={20} style={{ color: 'var(--primary-color)' }} />
                    </div>
                    <p>Change theme</p>
                </div>
                <div className="setting">
                    <div className="icon-div">
                        <HiLogout size={20} style={{ color: 'var(--primary-color)' }} />
                    </div>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
}

export default MainSection;
