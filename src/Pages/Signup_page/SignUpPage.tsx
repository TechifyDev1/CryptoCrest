import React from "react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import image from "../../assets/landing_page/signup.svg";
import "./SignUp.css";

const SignUpPage: React.FC = () => {
    return (
        <div className="sign-up-page">
            <div className="img">
                <img src={image} alt="" />
            </div>
            <form className="signup-form">
                <div className='signup-nav'>
                    <div>
                        <Link to='/login'> Login </Link>
                    </div>
                    <div className="signup"> Signup </div>
                </div>
                <div className="form-grp">
                    <HiOutlineUser className="signup-icon" />
                    <input type="text" name="username" id="username" placeholder="Unique username" />
                </div>
                <div className="form-grp">
                    <HiOutlineMail className="signup-icon" />
                    <input type="email" name="email" id="email" placeholder="Email address" />
                </div>
                <div className="form-grp">
                    <HiOutlineLockClosed className="signup-icon" />
                    <input type="password" name="password" id="password" placeholder="Strong password" />
                </div>
                <button className="signup-btn" type="submit">SignUp</button>
                <div className="alternative">Or Signup with</div>
                <button className="signup-google">
                    <FcGoogle size={25} />
                    <h2>Google</h2>
                </button>
            </form>
        </div>
    );
}

export default SignUpPage;
