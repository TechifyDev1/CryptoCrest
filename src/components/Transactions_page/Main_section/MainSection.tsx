import React from 'react';
import FilterSearchSection from './FilterSearch_section/FilterSearchSection';
import './Main.css';
import SummarySection from './Summery_section/SummerySection';
const MainSection: React.FC<{ toggleSideBar: boolean }> = ({ toggleSideBar }) => {
    return (
        <div className="main-section" style={{ width: toggleSideBar ? '' : '90%' }}>
            <SummarySection totalTransactions={250} totalFees="$45" balanceChange="+$1,200" />
            <FilterSearchSection />
        </div>
    );
}

export default MainSection;
