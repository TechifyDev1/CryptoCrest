import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdDashboard, MdSettings, MdSwapHoriz } from "react-icons/md";
import './SideBar.css';

const SideBar: React.FC<{ currentpage: string }> = ({ currentpage }) => {
    const [isNavActive, setIsNavActive] = useState<boolean>(true);
    return (
        <nav className="side-bar">
            <div className="content">
                <ul className="nav-links">
                    <li>
                        <MdDashboard />
                        <p style={{ display: isNavActive ? "block" : "none" }}>DashBoard</p>
                    </li>
                    <li>
                        <MdSwapHoriz />
                        <p style={{ display: isNavActive ? "block" : "none" }}>Transactions</p>
                    </li>
                    <li>
                        <MdSettings />
                        <p style={{ display: isNavActive ? "block" : "none" }}>Settings</p>
                    </li>
                </ul>
                <div className="menu-icon" onClick={() => setIsNavActive(prev => !prev)}>
                    <HiMenu />
                </div>
            </div>
        </nav>
    );
}

export default SideBar;
