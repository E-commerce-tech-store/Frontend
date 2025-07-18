import { useState } from 'react';
import { useProfile, useUpdateProfile } from '@features/auth/hooks/useAuth';
import { useAuth } from '@features/auth/context/AuthContext';

export default function UserProfile() {
  const { user } = useAuth();
  const { data: profileData, isLoading, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || ''
  });
  const [errors, setErrors] = useState<{ name?: string; general?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: { name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      await updateProfileMutation.mutateAsync({
        name: formData.name.trim()
      });
      setIsEditing(false);
    } catch (error: unknown) {
      console.error('Profile update error:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrors({
        general: axiosError.response?.data?.message || 'Failed to update profile. Please try again.'
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || ''
    });
    setIsEditing(false);
    setErrors({});
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const currentUser = profileData || user;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>

                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-sky-400'
                        }`}
                        disabled={updateProfileMutation.isPending}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={updateProfileMutation.isPending}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-900">{currentUser?.name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{currentUser?.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          currentUser?.role === 'ADMIN'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {currentUser?.role}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Account Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Statistics</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">Account Type</h3>
                    <p className="text-gray-600">
                      {currentUser?.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">Member Since</h3>
                    <p className="text-gray-600">Welcome to TechComp Store!</p>
                  </div>

                  {currentUser?.role === 'ADMIN' && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h3 className="font-medium text-red-900">Admin Access</h3>
                      <p className="text-red-700 text-sm">
                        You have administrative privileges on this platform.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
