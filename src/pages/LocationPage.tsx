import { useEffect, useState } from 'react';
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation
} from '../mock/API/locationApi';
import LocationForm from '../components/LocationForm';
import type { Location } from '../types/Location';

export default function LocationPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editing, setEditing] = useState<Location | null>(null);

  const loadData = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (data: Location) => {
    try {
      if (editing?.id) {
        await updateLocation(editing.id, data);
      } else {
        await createLocation(data);
      }
      await loadData();
      setEditing(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLocation(id);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <LocationForm onSubmit={handleSave} initialData={editing ?? undefined} />
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-2">Locations</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left">Code</th>
              <th className="text-left">Name</th>
              <th className="text-left">Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(loc => (
              <tr key={loc.id}>
                <td>{loc.code}</td>
                <td>{loc.name}</td>
                <td>{loc.active ? 'Yes' : 'No'}</td>
                <td className="space-x-2">
                  <button onClick={() => setEditing(loc)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(loc.id!)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
