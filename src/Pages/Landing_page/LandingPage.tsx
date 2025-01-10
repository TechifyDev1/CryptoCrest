import React from "react";
import FeaturesSection from "../../components/Landing_page/Features_section/FeaturesSection";
import HeroSection from "../../components/Landing_page/Hero_section/HeroSection";
import NavBar from "../../components/Landing_page/Nav_bar/NavBar";
import "./Landing.css";

const LandingPage: React.FC = () => {
    return (
        <div className="LandingPage">
            <NavBar />
            <HeroSection />
            <FeaturesSection />
        </div>
    );
}

export default LandingPage;
