import React from "react";
import Chart from "./Chart/Chart";
import './Overview.css';
import PortfolioSection from "./Portfolio_section/PortfolioSection";

const OverviewSection: React.FC = () => {
    return (
        <div className="overview-section" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="something" style={{ width: '50%', backgroundColor: 'var(--bg)', padding: '1rem 2rem' }}>
                <h2>Overview</h2>
                <Chart />
            </div>
            <PortfolioSection />
        </div>
    )
}

export default OverviewSection;
