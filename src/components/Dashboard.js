import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import SideMenu from "./SideMenu";
import Header from "./Header";
import Tree from "./Tree";

const Dashboard = () => {
  const initialStructure = {
    id: "ceo",
    name: "CEO",
    role: "CEO",
    children: [
      {
        id: "coo",
        name: "COO",
        role: "Chief Operating Officer",
        children: [
          {
            id: "gd1",
            name: "Group Director 1",
            role: "Group Director",
            children: [
              {
                id: "vp1",
                name: "Vice President 1",
                role: "Vice President",
                children: [
                  {
                    id: "mgr1",
                    name: "Manager 1",
                    role: "Manager",
                    children: [
                      {
                        id: "emp1",
                        name: "Employee 1",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp2",
                        name: "Employee 2",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp3",
                        name: "Employee 3",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp4",
                        name: "Employee 4",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp5",
                        name: "Employee 5",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "mgr2",
                    name: "Manager 2",
                    role: "Manager",
                    children: [
                      {
                        id: "emp6",
                        name: "Employee 6",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp7",
                        name: "Employee 7",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp8",
                        name: "Employee 8",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp9",
                        name: "Employee 9",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp10",
                        name: "Employee 10",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "mgr3",
                    name: "Manager 3",
                    role: "Manager",
                    children: [
                      {
                        id: "emp11",
                        name: "Employee 11",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp12",
                        name: "Employee 12",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp13",
                        name: "Employee 13",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp14",
                        name: "Employee 14",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp15",
                        name: "Employee 15",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "gd2",
            name: "Group Director 2",
            role: "Group Director",
            children: [
              {
                id: "vp2",
                name: "Vice President 2",
                role: "Vice President",
                children: [
                  {
                    id: "mgr4",
                    name: "Manager 4",
                    role: "Manager",
                    children: [
                      {
                        id: "emp16",
                        name: "Employee 16",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp17",
                        name: "Employee 17",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp18",
                        name: "Employee 18",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp19",
                        name: "Employee 19",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp20",
                        name: "Employee 20",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "mgr5",
                    name: "Manager 5",
                    role: "Manager",
                    children: [
                      {
                        id: "emp21",
                        name: "Employee 21",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp22",
                        name: "Employee 22",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp23",
                        name: "Employee 23",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp24",
                        name: "Employee 24",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp25",
                        name: "Employee 25",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "mgr6",
                    name: "Manager 6",
                    role: "Manager",
                    children: [
                      {
                        id: "emp26",
                        name: "Employee 26",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp27",
                        name: "Employee 27",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp28",
                        name: "Employee 28",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp29",
                        name: "Employee 29",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp30",
                        name: "Employee 30",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "gd3",
            name: "Group Director 3",
            role: "Group Director",
            children: [
              {
                id: "vp3",
                name: "Vice President 3",
                role: "Vice President",
                children: [
                  {
                    id: "mgr7",
                    name: "Manager 7",
                    role: "Manager",
                    children: [
                      {
                        id: "emp31",
                        name: "Employee 31",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp32",
                        name: "Employee 32",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp33",
                        name: "Employee 33",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp34",
                        name: "Employee 34",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp35",
                        name: "Employee 35",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "mgr8",
                    name: "Manager 8",
                    role: "Manager",
                    children: [
                      {
                        id: "emp36",
                        name: "Employee 36",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp37",
                        name: "Employee 37",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp38",
                        name: "Employee 38",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp39",
                        name: "Employee 39",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp40",
                        name: "Employee 40",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "mgr9",
                    name: "Manager 9",
                    role: "Manager",
                    children: [
                      {
                        id: "emp41",
                        name: "Employee 41",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp42",
                        name: "Employee 42",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp43",
                        name: "Employee 43",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp44",
                        name: "Employee 44",
                        role: "Employee",
                        children: [],
                      },
                      {
                        id: "emp45",
                        name: "Employee 45",
                        role: "Employee",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If no user is found, redirect to sign-in page
      navigate("/signin");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authUser");
    navigate("/signin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dashboard-container">
      <Header
        handleSignOut={handleSignOut}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        user={user} // Pass the user prop here
      />

      <div className={`main-content ${menuOpen ? "menu-open" : ""}`}>
        <div className="content">
          <Tree initialStructure={initialStructure} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
