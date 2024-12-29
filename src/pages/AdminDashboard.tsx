// Import necessary dependencies and types
import React, { useState, useEffect } from 'react';
import {
  User,
  Department,
  SystemSettings,
  //  UserCreation
} from '../types';
import {
  Button,
  Card,
  Table,
  Input,
  Alert,
  Loading,
} from '../components/shared';

const AdminDashboard: React.FC = () => {
  // Tab management
  const [activeTab, setActiveTab] = useState<
    'users' | 'departments' | 'settings'
  >('users');

  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [settings, setSettings] = useState<SystemSettings>({
    allowedFileTypes: ['.pdf', '.doc', '.docx'],
    maxFileSize: 10, // MB
    autoArchiveDays: 30,
    notificationSettings: {
      email: true,
      sms: true,
      inApp: true,
    },
  });

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // TODO: Replace with actual API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setUsers([
        {
          id: '1',
          username: 'john.doe',
          fullName: 'John Doe',
          email: 'john@gov.bd',
          role: 'OFFICER',
          departmentId: '1',
        },
        {
          id: '2',
          username: 'jane.smith',
          fullName: 'Jane Smith',
          email: 'jane@gov.bd',
          role: 'OFFICER',
          departmentId: '2',
        },
      ]);

      setDepartments([
        { id: '1', name: 'IT Department', code: 'IT' },
        { id: '2', name: 'Finance Department', code: 'FIN' },
        { id: '3', name: 'HR Department', code: 'HR' },
      ]);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  // User management handlers
  /*const handleCreateUser = async (userData: UserCreation) => {
        try {
            setIsLoading(true);
            // TODO: Implement actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccess('User created successfully');
            setShowUserModal(false);
            await loadData();
        } catch (err) {
            setError('Failed to create user');
        } finally {
            setIsLoading(false);
        }
    };*/

  // Department management handlers
  /*const handleCreateDepartment = async (departmentData: Partial<Department>) => {
        try {
            setIsLoading(true);
            // TODO: Implement actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccess('Department created successfully');
            setShowDepartmentModal(false);
            await loadData();
        } catch (err) {
            setError('Failed to create department');
        } finally {
            setIsLoading(false);
        }
    };*/

  // Settings management
  const handleSaveSettings = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  // Tab content renderers
  const renderUsers = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Users</h2>
        <Button onClick={() => setShowUserModal(true)}>Add User</Button>
      </div>

      <Table
        headers={['Name', 'Username', 'Email', 'Role', 'Department', 'Actions']}
        rows={users.map((user) => [
          user.fullName,
          user.username,
          user.email,
          user.role,
          departments.find((d) => d.id === user.departmentId)?.name || '-',
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => console.log('Edit user:', user.id)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => console.log('Delete user:', user.id)}
            >
              Delete
            </Button>
          </div>,
        ])}
      />
    </Card>
  );

  const renderDepartments = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Departments</h2>
        <Button onClick={() => setShowDepartmentModal(true)}>
          Add Department
        </Button>
      </div>

      <Table
        headers={['Name', 'Code', 'Actions']}
        rows={departments.map((dept) => [
          dept.name,
          dept.code,
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => console.log('Edit department:', dept.id)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => console.log('Delete department:', dept.id)}
            >
              Delete
            </Button>
          </div>,
        ])}
      />
    </Card>
  );

  const renderSettings = () => (
    <Card>
      <h2 className="text-lg font-medium mb-6">System Settings</h2>

      <div className="space-y-6">
        {/* File Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            File Settings
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allowed File Types
              </label>
              <Input
                type="text"
                name="allowedFileTypes"
                value={settings.allowedFileTypes.join(', ')}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    allowedFileTypes: e.target.value
                      .split(',')
                      .map((t) => t.trim()),
                  }))
                }
                label=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max File Size (MB)
              </label>
              <Input
                type="number"
                name="maxFileSize"
                value={settings.maxFileSize.toString()}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maxFileSize: parseInt(e.target.value),
                  }))
                }
                label=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Auto-Archive After (Days)
              </label>
              <Input
                type="number"
                name="autoArchiveDays"
                value={settings.autoArchiveDays.toString()}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    autoArchiveDays: parseInt(e.target.value),
                  }))
                }
                label=""
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={settings.notificationSettings.email}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notificationSettings: {
                      ...prev.notificationSettings,
                      email: e.target.checked,
                    },
                  }))
                }
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={settings.notificationSettings.sms}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notificationSettings: {
                      ...prev.notificationSettings,
                      sms: e.target.checked,
                    },
                  }))
                }
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable SMS Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={settings.notificationSettings.inApp}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notificationSettings: {
                      ...prev.notificationSettings,
                      inApp: e.target.checked,
                    },
                  }))
                }
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable In-App Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </Card>
  );

  if (isLoading && users.length === 0) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess('')}
          />
        )}

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'users'
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'departments'
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('departments')}
            >
              Departments
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'settings'
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'departments' && renderDepartments()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* Modals */}
      {showUserModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Create New User</h3>
            {/* Add user creation form */}
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showDepartmentModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Create New Department</h3>
            {/* Add department creation form */}
            <Button
              variant="secondary"
              onClick={() => setShowDepartmentModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
