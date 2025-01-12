import React from "react";
import SideBar from "../../components/Helpers/Sidebar/SideBar";

const DashboardPage: React.FC = () => {
    return (
        <div>
            <SideBar currentpage="page" />
            <h1>Dashboard</h1>
        </div>
    );
}

export default DashboardPage;
