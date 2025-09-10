// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Agar token nahi hai to login page pe redirect
    return <Navigate to="/" replace />;
  }

  return children; // Token hai, page render karo
};

export default ProtectedRoute;
