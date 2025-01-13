import React, { Dispatch, SetStateAction } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi2";
import './Navbar.css';

const NavBar: React.FC<{ togglenav: Dispatch<SetStateAction<boolean>> }> = ({ togglenav }) => {
    return (
        <nav className="top-nav">
            <div onClick={() => togglenav(prev => !prev)} className="menu-icon">
                <FaBarsStaggered size={25} />
            </div>
            <div className="profile-info">
                <div className="profile-image">
                    <HiOutlineUser size={25} style={{ border: 'none', margin: '0', marginTop: '5px' }} />
                </div>
                <span className="username">
                    TechifyDev
                </span>
            </div>
        </nav>
    );
}

export default NavBar;
