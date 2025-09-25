import { useState, useEffect } from 'react';
import { getProfile, changeName, changeEmail, changePhone } from '../api/services';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const { user } = useAuth();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
  try {
    setLoading(true);
    const profile = await getProfile(user?.id);
    if (!profile) throw new Error('Profile not found');

    // Access the first element in the user array
    const userData = profile.user[0]; 

    setUserProfile(userData);
    console.log(userData);

    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      department: userData.department || ''
    });
  } catch (error) {
    showMessage('error', 'Failed to load profile');
  } finally {
    setLoading(false);
  }
};

  const showMessage = (type, text, duration = 5000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), duration);
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    setEditingField(null);
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      department: userProfile.department
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [editingField]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      let response;
      const user_id = user?.id;

      switch (editingField) {
        case 'name':
          response = await changeName(user_id, formData.name);
          break;
        case 'email':
          response = await changeEmail(user_id, formData.email);
          break;
        case 'phone':
          response = await changePhone(user_id, formData.phone);
          break;
        default:
          return;
      }

      setUserProfile({ ...userProfile, [editingField]: formData[editingField] });
      setEditingField(null);
      showMessage('success', `${editingField.charAt(0).toUpperCase() + editingField.slice(1)} updated successfully`);
    } catch (error) {
      showMessage('error', `Failed to update ${editingField}`);
    }
  };

  const getDepartmentColor = (dept) => {
    const colorMap = {
      'Engineering': 'engineering',
      'Operations': 'operations',
      'Maintenance': 'maintenance',
      'Safety': 'safety',
      'Finance': 'finance',
      'HR': 'hr',
      'Procurement': 'procurement',
      'Regulatory': 'regulatory'
    };
    return colorMap[dept] || 'neutral';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                Profile Settings
              </h1>
              <p className="text-neutral-600">Manage your personal account information</p>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-success/10 border-success/20 text-success' 
              : 'bg-danger/10 border-danger/20 text-danger'
          }`}>
            {message.text}
          </div>
        )}

        {/* Profile Card */}
        {userProfile && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-primary text-secondary p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold">
                  {userProfile.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-heading font-semibold">{userProfile.name}</h2>
                  <p className="text-secondary/80">{userProfile.department} Department</p>
                  <p className="text-secondary/60 text-sm mt-1">User ID: {user?.id}</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-6">
              {/* Name Field */}
              <div className="flex items-center justify-between py-3 border-b border-divider">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  {editingField === 'name' ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
                      autoFocus
                    />
                  ) : (
                    <p className="text-primary">{userProfile.name}</p>
                  )}
                </div>
                {editingField === 'name' ? (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-success text-white rounded-md hover:bg-success/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('name')}
                    className="ml-4 px-4 py-2 text-accent hover:bg-accent/10 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Email Field */}
              <div className="flex items-center justify-between py-3 border-b border-divider">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  {editingField === 'email' ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
                    />
                  ) : (
                    <p className="text-primary">{userProfile.email}</p>
                  )}
                </div>
                {editingField === 'email' ? (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-success text-white rounded-md hover:bg-success/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('email')}
                    className="ml-4 px-4 py-2 text-accent hover:bg-accent/10 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex items-center justify-between py-3 border-b border-divider">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  {editingField === 'phone' ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
                    />
                  ) : (
                    <p className="text-primary">{userProfile.phone || 'Not provided'}</p>
                  )}
                </div>
                {editingField === 'phone' ? (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-success text-white rounded-md hover:bg-success/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('phone')}
                    className="ml-4 px-4 py-2 text-accent hover:bg-accent/10 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Department Field - Display Only */}
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Department
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${getDepartmentColor(userProfile.department)}/10 text-${getDepartmentColor(userProfile.department)}`}>
                      {userProfile.department}
                    </span>
                    <span className="text-xs text-neutral-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Contact admin to change department
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-500 rounded-md cursor-not-allowed">
                    Read Only
                  </span>
                </div>
              </div>

              {/* User ID Field - Display Only */}
              <div className="flex items-center justify-between py-3 border-t border-divider">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    User ID
                  </label>
                  <p className="text-primary font-mono text-sm">{user?.id}</p>
                </div>
                <div className="ml-4">
                  <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-500 rounded-md cursor-not-allowed">
                    Permanent
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;