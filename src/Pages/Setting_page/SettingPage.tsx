import React from 'react';
import MobileNav from '../../components/Helpers/Mobile_nav/MobileNav';
import MobileTopNav from '../../components/Helpers/Mobile_topnav/MobileTopNav';
import SideBar from '../../components/Helpers/Sidebar/SideBar';
import MainSection from '../../components/Settings_page/Main_section/MainSection';
import './Setting.css';

const SettingPage: React.FC = () => {
  return (
    <div className="setting-page">
      <MobileTopNav currentpage="Settings" />
      <SideBar toggleNav={true} currentpage="settings" />
      <MainSection />
      <MobileNav />
    </div>
  );
};

export default SettingPage;
