import React from "react";
import SignUpForm from "./Components/SignUpForm";
import styles from "./Signup.module.css";

function Signup() {
  return (
    <div
      className={`${styles.signupContainer} d-flex justify-content-center align-items-center bg-primary vh-100`}
    >
      <div className={`${styles.container} p-4 rounded w-50 h-80`}>
        <h2 className="text-center p-3">Register</h2>
        <SignUpForm />
      </div>
    </div>
  );
}

export default Signup;
