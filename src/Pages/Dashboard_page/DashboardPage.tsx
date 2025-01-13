import React, { useState } from "react";
import MainSection from "../../components/Dashboard/Main_section/MainSection";
import NavBar from "../../components/Dashboard/NavBar/NavBar";
import SideBar from "../../components/Helpers/Sidebar/SideBar";

const DashboardPage: React.FC = () => {
    const [toggleSideBar, setToggleNav] = useState<boolean>(false);
    return (
        <div>
            <NavBar togglenav={setToggleNav} />
            <SideBar currentpage="page" toggleNav={toggleSideBar} />
            <MainSection />
        </div>
    );
}

export default DashboardPage;
