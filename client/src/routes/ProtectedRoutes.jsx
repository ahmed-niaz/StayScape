import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import Loader from "../components/shared/Loader";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.element,
};
export default ProtectedRoutes;
