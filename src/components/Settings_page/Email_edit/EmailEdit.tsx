import { EmailAuthProvider, GoogleAuthProvider, linkWithCredential, onAuthStateChanged, reauthenticateWithPopup, unlink, updateEmail, updatePassword } from "firebase/auth";
import "./email-edit.css";
import { auth } from "../../../Firebase/firebase-init";
import { ChangeEvent, } from "react";
import { toast } from "sonner";
const EmailEdit: React.FC<{toggleEmailEdit: boolean}> = ({toggleEmailEdit}) => {
    const handleChangeEmail = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const loader = toast.loading("Updating....");
        const formData = new FormData(e.target);
        const oldEmail = formData.get("oldEmail") as string;
        const newEmail = formData.get("newEmail") as string;
        
        try {
            onAuthStateChanged(auth, async (user) => {
                if (!user) throw new Error("You have no account here");
                if (user?.email !== oldEmail) throw new Error("Invalid previous email");
            
                const isGoogle = user.providerData.some((provider) => provider.providerId === "google.com");
                if (isGoogle){
                    toast.warning("You signed up with google, so we'll reauthenticate you");
                    const newpassword = prompt("Please input your new paswword");
                    if (newpassword === "" && newpassword.length < 6) throw new Error ("Please input a valid password");
                    const googleProvider = new GoogleAuthProvider();
                    await reauthenticateWithPopup(user, googleProvider);
                    const credential = EmailAuthProvider.credential(oldEmail, newpassword as string);
                    await linkWithCredential(user, credential);
                    await updatePassword(user, newpassword as string);
                    await unlink(user, "google.com");
                    console.log("Success");
                }
                await updateEmail(user, newEmail);
            
                toast.dismiss(loader);
                toast.success("Email updated successfully");
            })
        } catch (e: any) {
            toast.dismiss(loader); // Dismiss the loading toast even on error
            toast.error(e.message);
            console.log(e);
        }
        
    }
    return(
        <div className="email-edit-container" style={{transform: toggleEmailEdit ? "" : "translateY(100%)"}}>
            <form className="email-edit-form" onSubmit={handleChangeEmail}>
                <input type="email" name="oldEmail" id="old-email" placeholder="Enter your old email" required/>
                <input type="email" name="newEmail" id="new-email" placeholder="Enter your new email" required/>
                <button type="submit" className="update-btn">Update!</button>
            </form>
        </div>
    )
}

export default EmailEdit;