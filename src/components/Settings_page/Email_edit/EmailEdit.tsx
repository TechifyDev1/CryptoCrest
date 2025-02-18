import { updateEmail } from "firebase/auth";
import "./email-edit.css";
import { auth } from "../../../Firebase/firebase-init";
import { ChangeEvent } from "react";
import { toast } from "sonner";
const EmailEdit: React.FC<{toggleEmailEdit: boolean}> = ({toggleEmailEdit}) => {
    const handleChangeEmail = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (user?.email !== e.target.oldEmail) throw new Error("Invalid previous email")
            if (!user) throw new Error("You have no account here");
            updateEmail(user, e.target.newEmail);
            toast.success("Email updated successfully");
        } catch(e: any) {
            toast.error(e.message);
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