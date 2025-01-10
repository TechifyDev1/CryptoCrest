import React from "react";

const Feature: React.FC<{ title: string; description: string; img: string }> = ({ title, description, img }) => {
    return (
        <div className="feature">
            <div className="feature-img">
                <img src={img} alt="Feature" />
            </div>
            <div className="descriptions">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Feature;
