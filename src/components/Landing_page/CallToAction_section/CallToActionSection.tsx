import React from "react";
import "./CallToAction.css";

const CallToActionSection: React.FC = () => {
    return (
        <section className="call-to-action-section">
            <div className="left"></div>
            <div className="middle">
                <h1>Manage your Cryptos with us now</h1>
                <button className="action-btn">Try now!</button>
            </div>
            <div className="right"></div>
        </section>
    );
}

export default CallToActionSection;
