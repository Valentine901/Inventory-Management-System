import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StaffDashboard from "./dashboards/staff/StaffDashboard";
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import { ProtectedRoute } from "./auth/ProtectedRoute";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/staff-dashboard" element={
        <ProtectedRoute>
          <StaffDashboard />
        </ProtectedRoute>
        } />

      <Route path="/admin-dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default App