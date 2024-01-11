import { FaUser } from "react-icons/fa";
import styles from "./ForgotPassword.module.css";
const ForgotPassword = () => {
  //   const [values, setValues] = useState({
  //     email: "",
  //   });
  //   const [errors, setErrors] = useState({});
  //   const handleInput = (e) => {
  //     setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setErrors(Validation(values));
  //   };
  return (
    <div
      className={`${styles.forgotContainer} d-flex bg-black content-box text-black-70 justify-content-center align-items-center vh-100`}
    >
      <div className="p-4 rounded w-50 h-80 bg-white">
        <h2 className="text-center p-3">Forgot Password?</h2>
        <p className=" d-flex justify-content-center align-items-center ">
          Enter your email and we will send you the instructions to reset your
          password
        </p>
        <div className={`${styles.inputIcon}`}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            className="form-control rounded-3"
            style={{ textAlign: "center" }}
          />
          <FaUser className={`${styles.icon}`} />
        </div>
        <button className={`${styles.btnGrad} btn w-100 rounded-5`}>
          SEND INSTRUCTIONS
        </button>
      </div>
    </div>
  );
};
export default ForgotPassword;
