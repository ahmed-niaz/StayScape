import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";

const Root = () => {
  return (
    <main className="font-lato">
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Root;
