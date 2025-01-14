import React from "react";
import { MdDashboard, MdSettings, MdSwapHoriz } from "react-icons/md";
import './SideBar.css';

const SideBar: React.FC<{ currentpage: string, toggleNav: boolean }> = ({ currentpage, toggleNav }) => {
    return (
        <nav className="side-bar">
            <div className="logo">
                <h1>CryptoCrest</h1>
            </div>
            <div className="content">
                <ul className="nav-links">
                    <li style={{ backgroundColor: currentpage === 'dashboard' ? 'var(--primary-color)' : '' }}>
                        <MdDashboard size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>DashBoard</p>
                    </li>
                    <li>
                        <MdSwapHoriz size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Transactions</p>
                    </li>
                    <li>
                        <MdSettings size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Settings</p>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;
