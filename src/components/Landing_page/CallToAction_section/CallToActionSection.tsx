import React from "react";
import { useNavigate } from "react-router-dom";
import call1 from "../../../assets/landing_page/call1.svg";
import call2 from "../../../assets/landing_page/call2.svg";
import "./CallToAction.css";

const CallToActionSection: React.FC = () => {
    const navigate = useNavigate();
    const gotoSignUp = () => {
        navigate('/signup')
    }
    return (
        <section className="call-to-action-section">
            <div className="left">
                <img src={call1} alt="" />
            </div>
            <div className="middle">
                <h1>Get Started with Secure and Simplified Crypto Management</h1>
                <button onClick={() => gotoSignUp()} className="action-btn">Try now!</button>
            </div>
            <div className="right">
                <img src={call2} alt="" />
            </div>
        </section>
    );
}

export default CallToActionSection;
