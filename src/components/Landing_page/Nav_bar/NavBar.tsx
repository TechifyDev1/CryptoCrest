import React from "react";
import "./NavBar.css";

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <h1 className="brandname">CryptoCrest</h1>
            <div className="auth-btn">
                <button className="login-btn">Login</button>
                <button className="register-btn">Register</button>
            </div>
        </nav>
    );
}

export default NavBar;
