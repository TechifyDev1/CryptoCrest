import React from "react";
import HeroSection from "../../components/Landing_page/Hero_section/HeroSection";
import NavBar from "../../components/Landing_page/Nav_bar/NavBar";
import "./Landing.css";

const LandingPage: React.FC = () => {
    return (
        <div className="LandingPage">
            <NavBar />
            <HeroSection />
        </div>
    );
}

export default LandingPage;
