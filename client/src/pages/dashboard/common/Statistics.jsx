import AdminStat from "../admin/AdminStat";
import useRole from "./../../../hooks/useRole";

const Statistics = () => {
  const [role, isLoading] = useRole();
  return <>{role === "admin" && <AdminStat />}</>;
};

export default Statistics;
