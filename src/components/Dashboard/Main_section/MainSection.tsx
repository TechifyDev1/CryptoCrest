import React from 'react';
import HighlitsSection from './Highlights_section/HighlightSection';
import './Main.css';
import OverviewContainer from './Overview_section/OverviewContainer';
const MainSection: React.FC = () => {
    return (
        <div className="main-section">
            <OverviewContainer />
            <HighlitsSection />
        </div>
    )
}

export default MainSection;
