import React from 'react'; // Importing React to use JSX and functional components.

import MobileNav from '../../components/Helpers/Mobile_nav/MobileNav'; // Importing the mobile navigation bar component.
import MobileTopNav from '../../components/Helpers/Mobile_topnav/MobileTopNav'; // Importing the top navigation bar component for mobile.
import SideBar from '../../components/Helpers/Sidebar/SideBar'; // Importing the sidebar component for navigation.
import MainSection from '../../components/Settings_page/Main_section/MainSection'; // Importing the main section of the settings page.
import './Setting.css'; // Importing CSS for styling the settings page.

const SettingPage: React.FC = () => { 
  return (
    <div className="setting-page"> {/* Wrapper div for the settings page with a class for styling */}
      <MobileTopNav currentpage="Settings" /> {/* Top navigation bar for mobile with "Settings" as the current page */}
      <SideBar toggleNav={true} currentpage="settings" /> {/* Sidebar component with toggle functionality and "settings" as the current page */}
      <MainSection /> {/* Main content section of the settings page */}
      <MobileNav /> {/* Bottom navigation bar for mobile */}
    </div>
  );
};

export default SettingPage; // Exporting the component for use in other parts of the application.
