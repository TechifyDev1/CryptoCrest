import "./email-edit.css";
const EmailEdit: React.FC<{toggleEmailEdit: boolean}> = ({toggleEmailEdit}) => {
    return(
        <div className="email-edit-container" style={{transform: toggleEmailEdit ? "" : "translateY(100%)"}}>
            <form className="email-edit-form">
                <input type="email" name="old-email" id="old-email" placeholder="Enter your old email" />
                <input type="email" name="new-email" id="new-email" placeholder="Enter your new email" />
                <button type="submit" className="update-btn">Update!</button>
            </form>
        </div>
    )
}

export default EmailEdit;