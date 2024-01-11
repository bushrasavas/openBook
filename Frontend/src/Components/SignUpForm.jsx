import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "../SignupValidation.js";
import styles from "./SignUpForm.module.css";
import { FaUser } from "react-icons/fa";
import passEye from "./passEye.jsx";

function SignUpForm() {
  const [PasswordInputType, ToggleIcon] = passEye();
  const [values, setValues] = useState({
    name: "",
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
        {/* <label htmlFor="Name">
          {" "}
          <strong>Full Name</strong>
        </label> */}
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={handleInput}
          className="form-control rounded-3"
          style={{ textAlign: "center" }}
        />
        {errors.name && <span className="text-danger"> {errors.name}</span>}
      </div>
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
        Sign up
      </button>
      <div className="checkbox-container mt-2">
        <input type="checkbox" id="rememberMeCheckbox" />
        <label htmlFor="rememberMeCheckbox">Remember Me</label>
      </div>
      <p className="mt-3 text-center">Already a member?</p>
      <Link
        to="/"
        className="btn mt-2 btn-default border w-100 bg-light rounded-5"
      >
        Log In
      </Link>
    </form>
  );
}

export default SignUpForm;
