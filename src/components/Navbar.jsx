import React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__logo">
        <h1 className="title">Pomodoro</h1>
      </div>
      <div className="links">
        <div>
          <input type="checkbox" className="checkbox" id="checkbox" />
          {/* <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="ball"></span>
          </label> */}
        </div>
        <a href="https://github.com/DreiDev04" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fab fa-github" />
        </a>
        <a href="https://www.facebook.com/iamjohnandrei/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </a>
      </div>
    </nav>
  );
}
