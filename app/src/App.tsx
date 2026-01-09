import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import OnePager from './pages/OnePager';
import BrandPack from './pages/BrandPack';
import InvestorPack from './pages/InvestorPack';
import InvestorPackDelta from './pages/InvestorPackDelta';
import ValuationRationale from './pages/investor/ValuationRationale';
import InvestorQuestions from './pages/investor/InvestorQuestions';
import UberPack from './pages/UberPack';
import UberClosePlan from './pages/UberClosePlan';
import UberEconomics from './pages/UberEconomics';
import DeckDashboard from './pages/DeckDashboard';
import GTMPackDelta from './pages/GTMPackDelta';
import RevenueModelPack from './pages/RevenueModelPack';
import ComponentsPage from './pages/ComponentsPage';

// Internal Admin (Project Management)
import AdminLogin from './pages/admin/AdminLogin';
import DashboardHome from './pages/admin/DashboardHome';
import LeadsPage from './pages/admin/LeadsPage';
import PersonnelPage from './pages/admin/PersonnelPage';
import TasksPage from './pages/admin/TasksPage';
import SettingsPage from './pages/admin/SettingsPage';
import ProvisionPage from './pages/admin/ProvisionPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Portal (Main Product)
import { ThemeProvider } from './components/portal/ThemeProvider';
import { AuthProvider } from './components/portal/AuthProvider';
import PortalLayout from './components/portal/PortalLayout';
import PortalProtectedRoute from './components/portal/PortalProtectedRoute';
import PortalDashboard from './pages/portal/Dashboard';
import PortalAlerts from './pages/portal/Alerts';
import PortalEmployees from './pages/portal/Employees';
import PortalEmployeeDetail from './pages/portal/EmployeeDetail';
import PortalIncidents from './pages/portal/Incidents';
import PortalIncidentDetail from './pages/portal/IncidentDetail';
import PortalCases from './pages/portal/Cases';
import PortalReports from './pages/portal/Reports';
import PortalDatabaseSearch from './pages/portal/DatabaseSearch';
import PortalMugshotSearch from './pages/portal/MugshotSearch';
import PortalRiskAssessment from './pages/portal/RiskAssessment';
import PortalRiskFactorDetail from './pages/portal/RiskFactorDetail';
import PortalAudit from './pages/portal/Audit';
import PortalIntegrations from './pages/portal/Integrations';
import PortalBilling from './pages/portal/Billing';
import PortalSettings from './pages/portal/Settings';
import PortalAdmin from './pages/portal/Admin';

// Auth
import AuthLogin from './pages/auth/Login';
import AuthCallback from './pages/auth/Callback';

// Public
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';


// Site Gate (Auth wrapper for marketing pages)
import SiteGatePage from './pages/SiteGatePage';
import SiteProtectedRoute from './components/SiteProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Site Gate Route (must be OUTSIDE SiteProtectedRoute) */}
        <Route path="/gate" element={<SiteGatePage />} />

        {/* Protected Marketing Routes */}
        <Route element={<SiteProtectedRoute><Layout /></SiteProtectedRoute>}>
          <Route path="/" element={<Landing />} />
          <Route path="/one-pager" element={<OnePager />} />
          <Route path="/brand" element={<BrandPack />} />
          <Route path="/investor" element={<InvestorPack />} />
          <Route path="/investor-delta" element={<InvestorPackDelta />} />
          <Route path="/investor-delta/appendix/valuation" element={<ValuationRationale />} />
          <Route path="/investor-delta/why" element={<InvestorQuestions />} />
          <Route path="/uber" element={<UberPack />} />
          <Route path="/uber-close" element={<UberClosePlan />} />
          <Route path="/uber-economics" element={<UberEconomics />} />
          <Route path="/decks" element={<DeckDashboard />} />
          <Route path="/gtm" element={<GTMPackDelta />} />
          <Route path="/revenue-model" element={<RevenueModelPack />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Route>

        {/* Public Pages (no Layout wrapper) */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />


        {/* Auth Routes */}
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Portal Routes (Main Product) - Wrapped with providers */}
        <Route
          path="/portal"
          element={
            <ThemeProvider>
              <AuthProvider>
                <PortalProtectedRoute>
                  <PortalLayout />
                </PortalProtectedRoute>
              </AuthProvider>
            </ThemeProvider>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PortalDashboard />} />

          {/* Core */}
          <Route path="employees" element={<PortalEmployees />} />
          <Route path="employees/:id" element={<PortalEmployeeDetail />} />
          <Route path="incidents" element={<PortalIncidents />} />
          <Route path="incidents/:id" element={<PortalIncidentDetail />} />
          <Route path="alerts" element={<PortalAlerts />} />
          <Route path="cases" element={<PortalCases />} />

          {/* Investigation */}
          <Route path="database-search" element={<PortalDatabaseSearch />} />
          <Route path="mugshot-search" element={<PortalMugshotSearch />} />

          {/* Risk & Compliance */}
          <Route path="risk-assessment" element={<PortalRiskAssessment />} />
          <Route path="risk-factors/:factor" element={<PortalRiskFactorDetail />} />
          <Route path="audit" element={<PortalAudit />} />

          {/* Reporting */}
          <Route path="reports" element={<PortalReports />} />

          {/* System */}
          <Route path="integrations" element={<PortalIntegrations />} />
          <Route path="billing" element={<PortalBilling />} />
          <Route path="settings" element={<PortalSettings />} />

          {/* Admin section - Protected by role check */}
          <Route path="admin" element={<PortalProtectedRoute requiredRole="admin"><PortalAdmin /></PortalProtectedRoute>} />
        </Route>

        {/* Internal Admin Routes (Project Management) */}
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
          <Route path="provision" element={<ProvisionPage />} />
          <Route path="personnel" element={<PersonnelPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Convenience Redirects */}
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="/investor-pack" element={<Navigate to="/investor" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
