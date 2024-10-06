import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <main className="relative min-h-screen md:flex font-lato">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
