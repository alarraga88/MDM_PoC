import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createLocation, updateLocation, getLocationById } from '../mock/API/locationApi';
import type { Location } from '../types/Location';
import { useNavigate, useParams } from 'react-router-dom';

export default function LocationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Location>();

  useEffect(() => {
    if (id) {
      getLocationById(id).then((data)=>{
        reset(data)
      });
    }
  }, [id]);

  const onSubmit = async (data: Location) => {
    if (id) {
      await updateLocation(id, data);
    } else {
      await createLocation(data);
    }
    navigate('/entities/locations');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">{id ? 'Edit Location' : 'Create Location'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Code</label>
          <input
            {...register('code', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.code && <p className="text-sm text-red-600 mt-1">Code is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">Name is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('active')}
            id="active"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="active" className="text-sm text-gray-700">
            Active
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {id ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/entities/locations')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
