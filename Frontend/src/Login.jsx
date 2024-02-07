import React from "react";
import "./index.css";
import Form from "./Components/Form.jsx";
import styles from "./Login.module.css";

function Login() {
  return (
    <div
      className={`${styles.loginContainer} d-flex content-box text-black-70 justify-content-center align-items-center vh-100`}
    >
      <div
        className={`${styles.container} p-4 rounded w-50 h-80 bg-opacity-50 mw `}
      >
        <h2 className="text-center p-3">Log In</h2>
        <Form />
      </div>
    </div>
  );
}

export default Login;
