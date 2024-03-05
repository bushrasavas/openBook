import "./App.css";
import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.classList.toggle("mobile-menu-open", !mobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove("mobile-menu-open");
  };

  return (
    <div className="App">
      <Header />
      <nav className={`App-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-nav-icon" onClick={handleMobileMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
          {isLoggedIn ? (
            <>
              <Link to={'/'} onClick={handleNavLinkClick}>Home</Link>
              <Link to={'/books'} onClick={handleNavLinkClick}>Books</Link>
              <Link to={'/mybooks'} onClick={handleNavLinkClick}>My Books</Link>
              <Link to={'/borrowedbooks'} onClick={handleNavLinkClick}>Borrowed Books</Link>
              <Link to={'/profile'} onClick={handleNavLinkClick}>Profile</Link>
              <Link to={'/contact'} onClick={handleNavLinkClick}>Contact</Link>
            </>
          ) : (
            <>
              <Link to={'/'} onClick={handleNavLinkClick}>Home</Link>
              <Link to={'/books'} onClick={handleNavLinkClick}>Books</Link>
              <Link to={'/about'} onClick={handleNavLinkClick}>About</Link>
              <Link to={'/contact'} onClick={handleNavLinkClick}>Contact</Link>
              <Link to={'/register'} onClick={handleNavLinkClick}>Register</Link>
              <Link to={'/login'} onClick={handleNavLinkClick}>Login</Link>
            </>
          )}
        </div>
        {isLoggedIn ? (
          <button className="login-logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-logout-button" onClick={handleLogin}>
            Login
          </button>
        )}
      </nav>
      <main className="App-main">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}