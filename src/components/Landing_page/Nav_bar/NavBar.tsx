import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const goToSignUp = () => {
        navigate('/signup');
    }
    const gotoLogin = () => {
        navigate('/login')
    }
    return (
        <nav className="navbar">
            <h1 className="brandname">CryptoCrest</h1>
            <div className="auth-btn">
                <button onClick={() => gotoLogin()} className="login-btn">Login</button>
                <button onClick={() => goToSignUp()} className="register-btn">Register</button>
            </div>
        </nav>
    );
}

export default NavBar;
