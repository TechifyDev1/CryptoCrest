import React from "react";
import { MdDashboard, MdSettings, MdSwapHoriz, MdWallet } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import './SideBar.css';

const SideBar: React.FC<{ currentpage: string, toggleNav: boolean }> = ({ currentpage, toggleNav }) => {
    const navigate = useNavigate()
    return (
        <nav className="side-bar" style={{ width: toggleNav ? '' : '10%' }}>
            <div className="logo">
                {toggleNav ? (<h1>CryptoCrest</h1>) : (<img width={70} style={{ borderRadius: '2rem', objectFit: 'contain', margin: '0' }} src="/crypto-dark.png" />)}

            </div>
            <div className="content">
                <ul className="nav-links">
                    <li onClick={() => navigate('/dashboard')} style={{ backgroundColor: currentpage === 'dashboard' ? 'var(--primary-color)' : '', justifyContent: toggleNav ? '' : 'center' }}>
                        <MdDashboard size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>DashBoard</p>
                    </li>
                    <li onClick={() => navigate('/portfolio')} style={{ backgroundColor: currentpage === 'portfolio' ? 'var(--primary-color)' : '', justifyContent: toggleNav ? '' : 'center' }}>
                        <MdWallet size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Portfolio</p>
                    </li>
                    <li onClick={() => navigate('/transactions')} style={{ backgroundColor: currentpage === 'transaction' ? 'var(--primary-color)' : '', justifyContent: toggleNav ? '' : 'center' }}>
                        <MdSwapHoriz size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Transactions</p>
                    </li>
                    <li onClick={() => navigate('/settings')} style={{ backgroundColor: currentpage === 'settings' ? 'var(--primary-color)' : '', justifyContent: toggleNav ? '' : 'center' }}>
                        <MdSettings size={25} />
                        <p style={{ display: toggleNav ? "block" : "none" }}>Settings</p>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;
