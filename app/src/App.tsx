import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import BrandPack from './pages/BrandPack';
import InvestorPack from './pages/InvestorPack';
import UberPack from './pages/UberPack';

import AdminLogin from './pages/admin/AdminLogin';
// import AdminDashboard from './pages/admin/AdminDashboard'; // Deprecated in favor of nested routes
import DashboardHome from './pages/admin/DashboardHome';
import LeadsPage from './pages/admin/LeadsPage';
import PersonnelPage from './pages/admin/PersonnelPage';
import TasksPage from './pages/admin/TasksPage';
import SettingsPage from './pages/admin/SettingsPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/brand" element={<BrandPack />} />
          <Route path="/investor" element={<InvestorPack />} />
          <Route path="/uber" element={<UberPack />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="personnel" element={<PersonnelPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Convenience Redirects */}
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/investor-pack" element={<Navigate to="/investor" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
