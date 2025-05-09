import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Callback from '../pages/Callback';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Roles from '../pages/Roles';
import CurrencyPage from '../pages/CurrencyPage';
import LocationList from '../components/LocationList';
import LocationForm from '../components/LocationForm';

const ProtectedLayout = () => {
  const { user, isAuthenticated } = useAuth();

  if (user === undefined) return null; // loading spinner for user feedback

  return isAuthenticated ? (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />

      {/* Protected app shell */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/entities/currency" element={<CurrencyPage />} />
        <Route path="/entities/locations" element={<LocationList />} />
        <Route path="/entities/locations/new" element={<LocationForm />} />
        <Route path="/entities/locations/:id" element={<LocationForm />} />
        <Route path="/roles" element={<Roles />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
