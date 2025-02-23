import { BsEnvelope } from "react-icons/bs";
import "./resetpasswordpage.css"

const ResetPasswordSentPage: React.FC = () => {
    return(
        <div className="resetPasswordSentPage">
            <h1>Password Reset Email Sent, Please check your inbox</h1>
            <BsEnvelope size={100} />
        </div>
    );
}

export default ResetPasswordSentPage;