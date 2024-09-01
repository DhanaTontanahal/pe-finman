import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faChartBar,
  faHome,
  faChevronLeft,
  faChevronRight,
  faUsers,
  faClock,
  faCalendarAlt,
  faProjectDiagram,
  faTags,
  faStoreAlt,
  faFileAlt,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import "./SideMenu.css";

const SideMenu = ({ menuOpen, toggleMenu, handleSignOut }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [analyzeMenuOpen, setAnalyzeMenuOpen] = useState(false);
  const [manageMenuOpen, setManageMenuOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleAnalyzeMenu = () => {
    setAnalyzeMenuOpen(!analyzeMenuOpen);
  };

  const toggleManageMenu = () => {
    setManageMenuOpen(!manageMenuOpen);
  };

  return (
    <nav
      className={`side-menu ${isCollapsed ? "collapsed" : ""} ${
        menuOpen ? "open" : ""
      }`}
    >
      <ul>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faHome} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/adminsmanager">
            <FontAwesomeIcon icon={faUsers} />
            {!isCollapsed && <span>Manage Admins</span>}
          </Link>
        </li>
        {/* <li>
          <Link to="/positions">
            <FontAwesomeIcon icon={faChartBar} />
            {!isCollapsed && <span>Positions</span>}
          </Link>
        </li> */}
        <li>
          <Link to="/timesheet">
            <FontAwesomeIcon icon={faClock} />
            {!isCollapsed && <span>TimeSheet</span>}
          </Link>
        </li>
        {/* <li>
          <Link to="/timetracker">
            <FontAwesomeIcon icon={faClock} />
            {!isCollapsed && <span>Time Tracker</span>}
          </Link>
        </li> */}
        {/* <li>
          <Link to="/calendar">
            <FontAwesomeIcon icon={faCalendarAlt} />
            {!isCollapsed && <span>Calendar</span>}
          </Link>
        </li> */}
        {/* <li className="menu-heading" onClick={toggleAnalyzeMenu}>
          <span>
            <FontAwesomeIcon icon={faChartBar} />
            &nbsp; &nbsp;
            {!isCollapsed && <span>Analyze</span>}
          </span>
          {!isCollapsed && (
            <FontAwesomeIcon
              icon={analyzeMenuOpen ? faAngleUp : faAngleDown}
              className="icon"
            />
          )}
        </li> */}
        {analyzeMenuOpen && (
          <>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faChartBar} />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/reports">
                <FontAwesomeIcon icon={faFileAlt} />
                {!isCollapsed && <span>Reports</span>}
              </Link>
            </li>
          </>
        )}
        <li className="menu-heading" onClick={toggleManageMenu}>
          <span>
            <FontAwesomeIcon icon={faProjectDiagram} />
            &nbsp; &nbsp;
            {!isCollapsed && <span>Manage</span>}
          </span>
          {!isCollapsed && (
            <FontAwesomeIcon
              icon={manageMenuOpen ? faAngleUp : faAngleDown}
              className="icon"
            />
          )}
        </li>
        {manageMenuOpen && (
          <>
            <li>
              <Link to="/projects">
                <FontAwesomeIcon icon={faProjectDiagram} />
                {!isCollapsed && <span>Projects</span>}
              </Link>
            </li>
            {/* <li>
              <Link to="/team">
                <FontAwesomeIcon icon={faUsers} />
                {!isCollapsed && <span>Team</span>}
              </Link>
            </li> */}
            <li>
              <Link to="/clients">
                <FontAwesomeIcon icon={faUsers} />
                {!isCollapsed && <span>Clients</span>}
              </Link>
            </li>
            <li>
              <Link to="/tags">
                <FontAwesomeIcon icon={faTags} />
                {!isCollapsed && <span>Tags</span>}
              </Link>
            </li>
            {/* <li>
              <Link to="/kiosks">
                <FontAwesomeIcon icon={faStoreAlt} />
                {!isCollapsed && <span>Kiosks</span>}
              </Link>
            </li> */}
          </>
        )}
        <li>
          <button onClick={handleSignOut} className="signout-button">
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </li>
      </ul>
      <div className="collapse-toggle center" onClick={toggleCollapse}>
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </div>
    </nav>
  );
};

export default SideMenu;
