import { Navigate } from "react-router-dom";

const DashboardHome = () => {
  // Redirect to create event by default
  return <Navigate to="/dashboard/create-event" replace />;
};

export default DashboardHome;