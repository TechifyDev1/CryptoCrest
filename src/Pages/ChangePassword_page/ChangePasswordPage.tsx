import { ChangeEvent } from "react";
import "./changepassword.css";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase-init";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const ChangePasswordPage: React.FC = () => {
    const handlePasswordUpdate: (e: ChangeEvent<HTMLFormElement>) => Promise<void> = async (e) => {
        e.preventDefault();
        const navigate = useNavigate();
        const newFormData = new FormData(e.target);
        const user = auth.currentUser;
        const currentPassword = newFormData.get("current-password") as string;
        const newPassword = newFormData.get("new-password") as string;
        const confirmPassword = newFormData.get("confirm-password") as string;
        try {
            if (!user) {
                throw new Error("User not found");
            }
            if (!user.email) {
                throw new Error("User email not found");
            }
            const credentials = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credentials);
            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            await updatePassword(user, newPassword);
            toast.success("Password updated successfully");
            console.log("Password updated successfully");
            navigate("/settings");
        } catch (e: any) {
            toast.error(e.message);
            console.log(e);
        }
    } 
    return (
        <div className="change-password-page">
            <h1>Update Your Password</h1>
            <form className="change-password-form" onSubmit={handlePasswordUpdate}>
                <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <input type="password" id="current-password" name="current-password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" id="new-password" name="new-password" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" required name="confirm-password"/>
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePasswordPage;