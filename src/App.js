// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ProjectsManager from "./components/projects/ProjectsManager";
import Guidelines from "./components/Guidelines";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import store from "./redux/store";
import "./App.css";
import ClientManager from "./clients/ClientManager";
import TagManager from "./components/tags/TagManager";
// import TimesheetManager from "./components/timesheet/TimeSheetManager";
import Timesheet from "./components/timesheet/Timesheet";
import ManageAdmins from "./components/ManageAdmins";
// import { AuthProvider } from "./components/context/AuthContext";

function App() {
  const handleSignOut = () => {
    localStorage.removeItem("authUser");
    window.location.href = "/signin";
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<Layout handleSignOut={handleSignOut} />}>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={<ProjectsManager useFirebase={true} />}
            />

            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <ClientManager useFirebase={true} />
                </PrivateRoute>
              }
            />

            <Route
              path="/tags"
              element={
                <PrivateRoute>
                  <TagManager useFirebase={true} />
                </PrivateRoute>
              }
            />

            <Route
              path="/timesheet"
              element={
                <PrivateRoute>
                  <Timesheet useFirebase={true} />
                </PrivateRoute>
              }
            />

            <Route
              path="/adminsmanager"
              element={
                <PrivateRoute>
                  <ManageAdmins useFirebase={true} />
                </PrivateRoute>
              }
            />

            <Route path="/guidelines" element={<Guidelines />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
