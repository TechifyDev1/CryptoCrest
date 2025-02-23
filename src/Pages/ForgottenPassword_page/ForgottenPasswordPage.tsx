import React, { ChangeEvent } from "react";
import "./forgottenpassword.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase-init";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";

const ForgottenPasswordPage: React.FC = () => {
    const handleUpdatePassword = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const navigate = useNavigate();
        const formData = new FormData(e.target);
        const typedEmail = formData.get("email") as string;
        const email = auth.currentUser?.email;
        try{
            if (typedEmail !== email) {
                throw new Error("Email does not match the email of the currently logged in user.");
            }
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent successfully.");
            navigate("/email-sent");
        } catch (error: any) {
            toast.error(error.message);
            toast.error("Please try again.");
        }
    }
    return(
        <div className="forgottenPasswordPage">
            <h1>Forgotten Password??</h1>
            <p>Don't worry, we got you covered. Just enter your email address and we will send you a link to reset your password.</p>
            <form onSubmit={handleUpdatePassword}>
                <label htmlFor="email" style={{textAlign: "left", width: "100%"}}>Email Address</label>
                <input type="email" placeholder="Email Address" required name="email" />
                <button type="submit">Send Reset Link</button>
                <p className="remembered-password">Wait! I remember my password. <Link to={"/login"}>Login</Link></p>
            </form>
        </div>
    );
}

export default ForgottenPasswordPage;