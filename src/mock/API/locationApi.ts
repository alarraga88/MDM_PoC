import type { Location } from '../../types/Location';
const baseUrl = '/api/locations';

export const getLocations = async (): Promise<Location[]> => {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json().then(data => data.body);
};

export const createLocation = async (data: Location): Promise<Location> => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create location');
  return res.json().then(data => data.body);
};

export const updateLocation = async (id: string, data: Partial<Location>): Promise<Location> => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update location');
  return res.json().then(data => data.body);
};

export const deleteLocation = async (id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete location');
};
export const getLocationById = async (id: string): Promise<Location> => {
    const res = await fetch(`${baseUrl}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch location');
    return res.json().then(data => data.body);
  };
