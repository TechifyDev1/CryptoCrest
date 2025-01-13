import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../../assets/landing_page/hero_img.svg";
import "./Hero.css";

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const gotoSignUp = () => {
        navigate('/signup')
    }
    return (
        <div className="HeroSection">
            <div className="description">
                <h1>Track Your Crypto Expenses with Ease</h1>
                <p>
                    CryptoCrest is your ultimate tool for managing cryptocurrency expenses. Stay on top of your transactions, monitor your spending habits, and gain insights into your portfolio with our user-friendly app.
                    <br />
                    Perfect for enthusiasts and professionals alike, CryptoCrest makes crypto expense tracking effortless and secure.
                </p>
                <button onClick={() => gotoSignUp()}>Get Started</button>
            </div>
            <div className="hero-img-div">
                <img src={HeroImg} alt="Hero Section" />
            </div>
        </div>
    );
}

export default HeroSection;
