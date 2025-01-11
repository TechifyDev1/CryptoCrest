import React from "react";
import CallToActionSection from "../../components/Landing_page/CallToAction_section/CallToActionSection";
import FeaturesSection from "../../components/Landing_page/Features_section/FeaturesSection";
import FooterSection from "../../components/Landing_page/Footer_section/FooterSection";
import HeroSection from "../../components/Landing_page/Hero_section/HeroSection";
import NavBar from "../../components/Landing_page/Nav_bar/NavBar";
import "./Landing.css";

const LandingPage: React.FC = () => {
    return (
        <div className="LandingPage">
            <NavBar />
            <HeroSection />
            <FeaturesSection />
            <CallToActionSection />
            <FooterSection />
        </div>
    );
}

export default LandingPage;
