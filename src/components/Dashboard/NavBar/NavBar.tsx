import React, { Dispatch, SetStateAction } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi2";
import './Navbar.css';

const NavBar: React.FC<{ togglenav: Dispatch<SetStateAction<boolean>>; toggleSideBar: boolean }> = ({ togglenav, toggleSideBar }) => {
    return (
        <nav className="top-nav" style={{ width: toggleSideBar ? '' : '90%' }}>
            <div onClick={() => togglenav(prev => !prev)} className="menu-icon">
                <FaBarsStaggered size={25} style={{ color: 'var(--primary-color)' }} className="bar" />
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
