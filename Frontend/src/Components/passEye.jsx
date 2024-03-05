import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const passEye = () => {
  const [visible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  const Icon = visible ? (
    <FaEyeSlash onClick={toggleVisibility} />
  ) : (
    <FaEye onClick={toggleVisibility} />
  );
  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default passEye;
