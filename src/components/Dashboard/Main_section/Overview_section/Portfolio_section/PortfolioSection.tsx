import React from "react";
import { FaLitecoinSign } from "react-icons/fa6";
import { RiBitCoinFill } from "react-icons/ri";
import { SiRipple } from "react-icons/si";
import './Portfolio.css';

const PortfolioSection: React.FC = () => {
    return (
        <div className="recent_trans">
            <div className="header">
                <p>Your portfolio</p>
            </div>
            <div className="balance-section">
                <span><h2>$13, 2332</h2></span>
                <span>Total balance</span>
            </div>
            <div className="coins-balances">
                <div className="coin">
                    <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', alignItems: 'center' }}>
                        <RiBitCoinFill size={25} style={{ color: 'var(--primary-color)' }} />
                        Bitcoin
                    </div>
                    <div className="amt-container">
                        <span><b>0.000242 BTC</b></span>
                        <span>0.125 USD</span>
                    </div>
                </div>
                <div className="coin">
                    <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', alignItems: 'center' }}>
                        <FaLitecoinSign size={25} style={{ color: 'var(--primary-color)' }} />
                        Litecoin
                    </div>
                    <div className="amt-container">
                        <span><b>0.000242 BTC</b></span>
                        <span>0.125 USD</span>
                    </div>
                </div>
                <div className="coin">
                    <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', alignItems: 'center' }}>
                        <SiRipple size={25} style={{ color: 'var(--primary-color)' }} />
                        Ripple
                    </div>
                    <div className="amt-container">
                        <span><b>0.000242 BTC</b></span>
                        <span>0.125 USD</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioSection;
