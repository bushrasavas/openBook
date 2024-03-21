import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    return (
      <>
        <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/account">
          <button>Account Page</button>
        </Link>
      </div>
      </>
    );
  }
  
  export default Header;