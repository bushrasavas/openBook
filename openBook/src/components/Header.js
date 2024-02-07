import React from "react";
import logoImage from "../openbook.png";

export default function Header() {
  return (
    <div className="App-header">
      <img src={logoImage} alt="Logo" className="logo-img" />
    </div>
  );
}