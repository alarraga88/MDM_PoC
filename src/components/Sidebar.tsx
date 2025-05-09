import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [isEntitiesOpen, setIsEntitiesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r shadow">
      <div className="p-4 text-xl font-bold">MDM POC</div>
      <nav className="flex flex-col p-4 gap-2 text-gray-700">
        <Link to="/" className={`hover:text-blue-600 ${isActive('/') && 'text-blue-600 font-medium'}`}>🏠 Dashboard</Link>

        <div className="mt-4 text-sm font-semibold text-gray-500">General</div>
        <button
          onClick={() => setIsEntitiesOpen(!isEntitiesOpen)}
          className="pl-2 text-left hover:text-blue-600"
        >
          🛠️ Entities {isEntitiesOpen ? '▲' : '▼'}
        </button>
        {isEntitiesOpen && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              to="/entities/currency"
              className={`hover:text-blue-600 ${isActive('/entities/currency') && 'text-blue-600 font-medium'}`}
            >
              Currency
            </Link>
            <Link
              to="/entities/locations"
              className={`hover:text-blue-600 ${isActive('/entities/locations') && 'text-blue-600 font-medium'}`}
            >
              Location
            </Link>
          </div>
        )}

        <div className="mt-4 text-sm font-semibold text-gray-500">Settings</div>
        <Link
          to="/roles"
          className={`pl-2 hover:text-blue-600 ${isActive('/roles') && 'text-blue-600 font-medium'}`}
        >
          🧩 Roles
        </Link>
      </nav>
    </aside>
  );
}
