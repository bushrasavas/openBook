import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "../LoginValidation.js";
import styles from "./Form.module.css";
import { FaUser } from "react-icons/fa";
import passEye from "./passEye.jsx";

function Form() {
  const [PasswordInputType, ToggleIcon] = passEye();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="mb-3">
        {/* <label htmlFor="email">
          {" "}
          <strong>Enter Email</strong>
        </label> */}
        <div className={`${styles.inputIcon}`}>
          <input
            type="email"
            placeholder="User Name"
            name="email"
            onChange={handleInput}
            className="form-control rounded-3"
            style={{ textAlign: "center" }}
          />
          <FaUser className={`${styles.icon}`} />
        </div>
        {errors.email && <span className="text-danger"> {errors.email}</span>}
      </div>
      <div className="mb-3">
        {/* <label htmlFor="password">
          <strong>Enter Password</strong>
        </label> */}
        <div className={`${styles.inputIcon}`}>
          <input
            type={PasswordInputType}
            placeholder="Password"
            name="password"
            onChange={handleInput}
            className="form-control rounded-3"
            style={{ textAlign: "center" }}
          />
          <span className={`${styles.passwordIcon}`}>{ToggleIcon}</span>
        </div>
        {errors.password && (
          <span className="text-danger"> {errors.password}</span>
        )}
      </div>

      <button type="submit" className={`${styles.btnGrad} btn w-100 rounded-5`}>
        Log In
      </button>
      <div className={`${styles.checkboxContainer}`}>
        <div>
          <input type="checkbox" id="rememberMeCheckbox" />
          <label htmlFor="rememberMeCheckbox">Remember Me</label>
        </div>
        <Link to="/forgetpassword">Forgot Password?</Link>
      </div>
      <p className="mt-3 text-center">Not a member?</p>
      <Link
        to="/signup"
        className="btn btn-box border w-100 bg-light rounded-5 text-decoration-none"
      >
        Create Account
      </Link>
    </form>
  );
}

export default Form;
