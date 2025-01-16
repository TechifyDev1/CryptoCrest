import React from "react";
import './Highlights.css';

const HighlitsSection: React.FC = () => {
    return (
        <div className="highlights-section">
            <div className="total-income">
                <span style={{ fontWeight: 'bold' }}>Total Income</span>
                <h3>$14, 023</h3>
            </div>
            <div className="ethereum-income">
                <span style={{ fontWeight: 'bold' }}>Ethereum wallet</span>
                <h3>$14, 023</h3>
            </div>
            <div className="bitcoin-income">
                <span style={{ fontWeight: 'bold' }}>Bitcoin wallet</span>
                <h3>$14, 023</h3>
            </div>
        </div>
    );
}

export default HighlitsSection;
