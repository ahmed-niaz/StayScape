import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Loader from "../components/shared/Loader";
import useRole from "../hooks/useRole";

const HostRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loader />;
  if (role === "host") return children;
  return <Navigate to="/dashboard" />;
};

HostRoute.propTypes = {
  children: PropTypes.element,
};

export default HostRoute;
