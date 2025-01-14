import React from "react";
import './Highlights.css';

const HighlitsSection: React.FC = () => {
    return (
        <div className="highlights-section">
            <div className="total-income">
                <span>Total Income</span>
                <h3>$14, 023</h3>
            </div>
            <div className="ethereum-income">
                <span>Ethereum wallet</span>
                <h3>$14, 023</h3>
            </div>
            <div className="bitcoin-income">
                <span>Bitcoin wallet</span>
                <h3>$14, 023</h3>
            </div>
        </div>
    );
}

export default HighlitsSection;
