import React from "react";
import "./forgottenpassword.css";
import { Link } from "react-router-dom";

const ForgottenPasswordPage: React.FC = () => {
    return(
        <div className="forgottenPasswordPage">
            <h1>Forgotten Password??</h1>
            <p>Don't worry, we got you covered. Just enter your email address and we will send you a link to reset your password.</p>
            <form>
                <input type="email" placeholder="Email Address" required />
                <button type="submit">Send Reset Link</button>
                <p className="remembered-password">Wait! I remember my password. <Link to={"/login"}>Login</Link></p>
            </form>
        </div>
    );
}

export default ForgottenPasswordPage;