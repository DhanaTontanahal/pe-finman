import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ handleSignOut, toggleMenu, menuOpen, user }) => {
  console.log(user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <FontAwesomeIcon
        icon={faBars}
        className={`hamburger-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      />
      <h1 className="header-title">Clock-Time</h1>
      <div className="user-info">
        <div className="user-profile" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <span className="user-name">
            {user?.displayName || user?.email || "User"}
          </span>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleSignOut} className="dropdown-signout-button">
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
