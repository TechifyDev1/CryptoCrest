import React from "react";
import "./unverifiedemail.css";

const UnverifiedEmailPage: React.FC = () => {
  return (
    <div className="unverifiedemailpage">
        <h1>Unverified Email ⚠️</h1>
        <p>
            Your email address is not verified. Please verify your email address by
            clicking on the link sent to your email address.
        </p>
    </div>
  );
};
export default UnverifiedEmailPage;