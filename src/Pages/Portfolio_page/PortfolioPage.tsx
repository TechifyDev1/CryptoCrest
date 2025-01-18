import React, { useState } from "react";
import NavBar from "../../components/Dashboard/NavBar/NavBar";
import MobileNav from "../../components/Helpers/Mobile_nav/MobileNav";
import SideBar from "../../components/Helpers/Sidebar/SideBar";
import MainSection from "../../components/Portfolio_page/Main_section/MainSection";
import './Portfolio.css';

const PortFolioPage: React.FC = () => {
    const [toggleNav, setToggleNav] = useState<boolean>(false);
    return (
        <div className="portfolio-page">
            <SideBar toggleNav={toggleNav} currentpage="portfolio" />
            <MobileNav />
            <NavBar toggleSideBar={toggleNav} togglenav={setToggleNav} />
            <MainSection toggleSideBar={toggleNav} />
        </div>
    );
}

export default PortFolioPage;
