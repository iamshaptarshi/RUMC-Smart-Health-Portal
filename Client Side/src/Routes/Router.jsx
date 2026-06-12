import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import BookAppointment from "../Pages/Book Appointment/BookAppointment";
import History from "../Pages/Medical History/History";
import Schedules from "../Pages/Schedules/Schedules";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DoctorDashboard from "../Pages/Dashboard/Doctor/DoctorDashboard";
import DashHome from "../Layouts/Dashboard/DashHome";
import ManageSchedule from "../Pages/Dashboard/Doctor/ManageSchedule";
import EmergencyServices from "../Pages/EmergencyServices/EmergencyServices";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import AbsentPatients from "../Pages/Dashboard/Doctor/AbsentPatients";
import VirtualPrescription from "../Pages/Dashboard/Doctor/VirtualPrescription";
import VirtualPrescriptionRequest from "../Pages/VirtualPrescriptionRequest/VirtualPrescriptionRequest";
import PendingTests from "../Pages/Pending Tests/PendingTests";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import LabDashHome from "../Layouts/LabDashboard/LabDashHome";
import LabPendingTests from "../Layouts/LabDashboard/LabPendingTests";
import LabProcessingTests from "../Layouts/LabDashboard/LabProcessingTests";
import LabDashboard from "../Layouts/LabDashboard/LabDashboard";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "book-appointment",
        Component: BookAppointment,
      },
      {
        path: "pending-tests",
        Component: PendingTests,
      },
      {
        path: "virtual-prescription-request",
        Component: VirtualPrescriptionRequest,
      },
      {
        path: "medical-history",
        Component: History,
      },
      {
        path: "schedules",
        Component: Schedules,
      },
      {
        path: "emergency",
        Component: EmergencyServices,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,

    children: [
      {
        index: true,
        Component: DashHome,
      },
      {
        path: "manage-schedule",
        Component: ManageSchedule,
      },
      {
        path: "book-appointment",
        Component: BookAppointment,
      },
      {
        path: "medical-history",
        Component: History,
      },
      {
        path: "schedules",
        Component: Schedules,
      },
      {
        path: "absent",
        Component: AbsentPatients,
      },
      {
        path: "virtual-prescription",
        Component: VirtualPrescription,
      },
    ],
  },
  {
  path: "/lab-dashboard",
  element: <LabDashboard />,
  children: [
    { index: true, Component: LabDashHome },
    { path: "pending", Component: LabPendingTests },
    { path: "processing", Component: LabProcessingTests },
  ],
}
]);
