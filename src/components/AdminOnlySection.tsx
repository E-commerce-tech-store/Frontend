import { useAdminData } from '../hooks/useAuth';

export default function AdminOnlySection() {
  const { data: adminData, isLoading, error } = useAdminData();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Admin Only Data</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Admin Only Data</h3>
        <div className="text-red-600">
          Failed to load admin data. Please check your permissions.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-red-600">Admin Only Data</h3>
      <div className="bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-800">
          <strong>Admin Access Confirmed:</strong>{' '}
          {adminData?.message || 'You have admin privileges'}
        </p>
        <p className="text-sm text-red-600 mt-2">
          This data is only visible to administrators and comes from the protected admin-only
          backend endpoint.
        </p>
      </div>
    </div>
  );
}
