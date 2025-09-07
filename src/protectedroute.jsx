import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    // ✅ Must be inside return
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
