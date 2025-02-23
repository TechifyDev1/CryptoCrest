import React, { useState } from 'react';
import NavBar from '../../components/Dashboard/NavBar/NavBar';
import MobileNav from '../../components/Helpers/Mobile_nav/MobileNav';
import SideBar from '../../components/Helpers/Sidebar/SideBar';
import MainSection from '../../components/Portfolio_page/Main_section/MainSection';
import './Portfolio.css';
import MobileTopNav from '../../components/Helpers/Mobile_topnav/MobileTopNav';
import AddTransBtn from '../../components/Helpers/Add_trans/AddTransBtn';

const PortFolioPage: React.FC = () => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  return (
    <div className="portfolio-page">
      <SideBar toggleNav={toggleNav} currentpage="portfolio" />
      <MobileNav />
      <NavBar toggleSideBar={toggleNav} togglenav={setToggleNav} />
      <MobileTopNav currentpage="Portfolio" />
      <MainSection toggleSideBar={toggleNav} />
      <AddTransBtn />
    </div>
  );
};

export default PortFolioPage;
