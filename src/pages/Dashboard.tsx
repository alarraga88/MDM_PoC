import { useAuth } from '../auth/AuthProvider';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user || !user.profile) {
    return <p className="p-4">Loading user...</p>; // Or fallback content
  }

  return (
    <div className="flex flex-col gap-3">
      <h2>Dashboard - Hello {user.profile.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">History</h2>
          <p className="text-gray-500">No Data.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Drafts</h2>
          <p className="text-gray-500">No Data.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
