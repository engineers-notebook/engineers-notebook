import React from 'react';
import '../styles/index.css';

function LoginNavbar() {
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="signup">
          <a href="./signup">Signup</a>
        </div>
        <div className="login">
          <a href="./login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default LoginNavbar;
