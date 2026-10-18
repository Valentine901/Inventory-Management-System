import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Loader from "../Components/Loader";


export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;

  if (user === null) return <Navigate to="/" />
  
  return children;
};



