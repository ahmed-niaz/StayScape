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
import Profile from "../pages/dashboard/common/Profile";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import MyBookings from "../pages/dashboard/guest/MyBookings";
import ManageBookings from "../pages/dashboard/host/ManageBookings";

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
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Statistics />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-listings",
        element: (
          <ProtectedRoutes>
            <HostRoute>
              {" "}
              <MyListings />
            </HostRoute>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add-room",
        element: (
          <ProtectedRoutes>
            <HostRoute>
              <AddRoom />
            </HostRoute>
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            {" "}
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoutes>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoutes>
            <MyBookings />
          </ProtectedRoutes>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <ProtectedRoutes>
            <HostRoute>
              <ManageBookings />
            </HostRoute>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
