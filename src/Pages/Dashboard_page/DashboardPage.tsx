import React, { useState } from "react";
import MainSection from "../../components/Dashboard/Main_section/MainSection";
import NavBar from "../../components/Dashboard/NavBar/NavBar";
import MobileNav from "../../components/Helpers/Mobile_nav/MobileNav";
import SideBar from "../../components/Helpers/Sidebar/SideBar";

const DashboardPage: React.FC = () => {
    const [toggleSideBar, setToggleNav] = useState<boolean>(false);
    return (
        <div>
            <NavBar togglenav={setToggleNav} toggleSideBar={toggleSideBar} />
            <SideBar currentpage="dashboard" toggleNav={toggleSideBar} />
            <MainSection toggleSideBar={toggleSideBar} />
            <MobileNav />
        </div>
    );
}

export default DashboardPage;
