// pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMockUser } from '../auth/AuthService';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password } = form;

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const role = username === 'admin' ? 'admin' : 'viewer';
      await createMockUser(username, role);
      console.log('mock user stored');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
    </div>
  );
}
