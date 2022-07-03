import { useContext } from "react";
import { Navigate } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";

const ProtectedRoute = ({ children }) => {
    const { userData } = useContext(userDataContext);
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;