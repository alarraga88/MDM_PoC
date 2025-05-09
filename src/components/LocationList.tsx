import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations, deleteLocation } from '../mock/API/locationApi';
import type { Location } from '../types/Location';

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();

  const loadData = async () => {
    const data = await getLocations();
    setLocations(data);
  };

  const handleDelete = async (id: string) => {
    await deleteLocation(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">Locations</h1>
      <button
        onClick={() => navigate('/entities/locations/new')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add Location
      </button>
    </div>

    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Code</th>
            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Name</th>
            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Active</th>
            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {locations?.map((loc) => (
            <tr key={loc.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{loc.code}</td>
              <td className="px-4 py-2">{loc.name}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    loc.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {loc.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/entities/locations/${loc.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(loc.id!)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {locations.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                No locations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  );
}
