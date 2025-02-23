import React from 'react';
import HighlitsSection from './Highlights_section/HighlightSection';
import './Main.css';
import OverviewContainer from './Main_dashboard_section/OverviewContainer';
import OverviewSection from './Overview_section/OverviewSection';
const MainSection: React.FC<{ toggleSideBar: boolean }> = ({
  toggleSideBar,
}) => {
  return (
    <div className="main-section" style={{ width: toggleSideBar ? '' : '90%' }}>
      <OverviewContainer />
      <HighlitsSection />
      <OverviewSection />
    </div>
  );
};

export default MainSection;
