import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userName = user?.profile?.name ?? 'Guest';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold"></h1>
      <div className="text-gray-700">
        Welcome, <span className="font-semibold">{userName}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
