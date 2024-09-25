import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import RoomDetails from "../pages/room_details/RoomDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/dashboard/common/Statistics";
import MyListings from "../pages/dashboard/host/MyListings";
import AddRoom from "../pages/dashboard/host/AddRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <ProtectedRoutes>
            <RoomDetails />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "add-room",
        element: <AddRoom />,
      },
    ],
  },
]);
