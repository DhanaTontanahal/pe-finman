import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import Header from "./Header";
import "./Layout.css";

const Layout = ({ handleSignOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If no user is found, redirect to sign-in page
      navigate("/signin");
    }
  }, [navigate]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="layout-container">
      <Header
        handleSignOut={handleSignOut}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        user={user} // Pass the user prop here
      />
      <SideMenu
        menuOpen={menuOpen}
        handleSignOut={handleSignOut}
        toggleMenu={toggleMenu}
        user={user} // Optionally pass the user prop here too
      />
      <div className={`main-content ${menuOpen ? "menu-open" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
