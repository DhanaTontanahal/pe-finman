import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("authUser");

  return auth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
