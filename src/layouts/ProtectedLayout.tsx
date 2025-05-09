import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ProtectedLayout = () => {
  const user = useAuth();

  // While checking auth status should be a spinnerrrr
  if (user === undefined) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render layout
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
