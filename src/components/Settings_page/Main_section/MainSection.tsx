import { HiLogout } from "react-icons/hi";
import { HiCamera, HiEnvelope, HiKey, HiPencil } from "react-icons/hi2";
import { TbToggleLeft } from "react-icons/tb";
import './Main.css';
import { auth } from "../../../Firebase/firebase-init";
import { useState } from "react";
import EmailEdit from "../Email_edit/EmailEdit";

const MainSection: React.FC = () => {
    const username = auth.currentUser?.displayName;
    const [toggleEmailEdit, setToggleEmailEdit] = useState<boolean>(true);
    return (
        <div className="set-main-section">
            <div className="profile-header">
                <div className="img-edit">
                    <img src="https://randomuser.me/api/portraits/lego/5.jpg" alt="profile" />
                    <button className="edit-img">
                        <HiCamera size={20} style={{ color: 'var(--primary-color)' }} />
                    </button>
                </div>
                <div className="username-edit">
                    <h1>{username}</h1>
                    <button className="edit-username">
                        <HiPencil size={20} style={{ color: 'var(--primary-color)' }} />
                    </button>
                </div>
            </div>
            <div className="main-settings">
                <div className="setting" onClick={() => setToggleEmailEdit(prev => !prev)}>
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
                    <EmailEdit toggleEmailEdit={toggleEmailEdit}/>
                </div>
            </div>
        </div>
    );
}

export default MainSection;
