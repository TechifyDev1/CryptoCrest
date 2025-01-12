import React from "react";
import { FcGoogle } from "react-icons/fc";
import { HiLockClosed, HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import image from "../../assets/landing_page/login.svg";
import './Login.css';

const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <div className="img">
                <img src={image} alt="login image" />
            </div>
            <form className="login-form">
                <div className="login-nav">
                    <div className="signup">
                        <Link to='/signup' style={{ textDecoration: 'none', color: 'var(--text-color)' }}> SignUp </Link>
                    </div>
                    <div className="login">
                        Login
                    </div>
                </div>
                <h2 style={{ textAlign: 'center', margin: '1rem' }}>Welcome Back! Dive Into Your Crypto Insights</h2>
                <div className="form-grp">
                    <HiOutlineUser className="icons" />
                    <input type="text" name="username" id="username" className="username" placeholder="Enter your user name" />
                </div>
                <div className="form-grp">
                    <HiLockClosed className="icons" />
                    <input type="password" name="password" id="password" className="password" placeholder="Enter your password" />
                </div>
                <button className="login-btn" type="submit">Login</button>
                <div className="alternative">Or Login with</div>
                <button className="login-google">
                    <FcGoogle size={25} className="google-icon" />
                    <h2>oogle</h2>
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
