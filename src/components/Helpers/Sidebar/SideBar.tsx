import React from "react";
import { MdDashboard, MdSettings, MdSwapHoriz } from "react-icons/md";
import './SideBar.css';

const SideBar: React.FC<{ currentpage: string, toggleNav: boolean }> = ({ currentpage, toggleNav }) => {
    return (
        <nav className="side-bar" style={{ width: toggleNav ? '' : '10%' }}>
            <div className="logo">
                {toggleNav ? (<h1>CryptoCrest</h1>) : (<img width={70} style={{ borderRadius: '2rem', objectFit: 'contain', margin: '0' }} src="/crypto-dark.png" />)}

            </div>
            <div className="content">
                <ul className="nav-links">
                    <li style={{ backgroundColor: currentpage === 'dashboard' ? 'var(--primary-color)' : '', justifyContent: toggleNav ? '' : 'center' }}>
                        <MdDashboard size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>DashBoard</p>
                    </li>
                    <li style={{ justifyContent: toggleNav ? '' : 'center' }}>
                        <MdSwapHoriz size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Transactions</p>
                    </li>
                    <li style={{ justifyContent: toggleNav ? '' : 'center' }}>
                        <MdSettings size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Settings</p>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;
