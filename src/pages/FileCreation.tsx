// Import necessary dependencies and types
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCreationData,
  Department,
  User,
  // WorkflowStep
} from '../types';
import {
  Button,
  Input,
  Card,
  Alert,
  //Loading
} from '../components/shared';

const FileCreation: React.FC = () => {
  const navigate = useNavigate();

  // Main form state
  const [fileData, setFileData] = useState<FileCreationData>({
    title: '',
    description: '',
    initialDocuments: [],
    workflow: [],
  });

  // UI state management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Mock data for dropdowns - replace with API calls in production
  const [departments] = useState<Department[]>([
    { id: '1', name: 'IT Department', code: 'IT' },
    { id: '2', name: 'Finance Department', code: 'FIN' },
    { id: '3', name: 'HR Department', code: 'HR' },
  ]);

  const [officers] = useState<User[]>([
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

  // Form input handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // TODO: Implement file upload logic
      console.log('Files selected:', files);
    }
  };

  // Workflow step management
  const handleAddWorkflowStep = () => {
    setFileData((prev) => ({
      ...prev,
      workflow: [
        ...prev.workflow,
        {
          id: `temp-${Date.now()}`,
          fileId: '',
          stepNumber: prev.workflow.length + 1,
          departmentId: '',
          officerId: '',
          status: 'PENDING',
        },
      ],
    }));
  };

  const handleWorkflowStepChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    setFileData((prev) => ({
      ...prev,
      workflow: prev.workflow.map((step, i) =>
        i === index ? { ...step, [field]: value } : step,
      ),
    }));
  };

  const handleRemoveWorkflowStep = (index: number) => {
    setFileData((prev) => ({
      ...prev,
      workflow: prev.workflow
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, stepNumber: i + 1 })),
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (!fileData.title.trim()) {
        throw new Error('File title is required');
      }

      if (fileData.workflow.length === 0) {
        throw new Error('At least one workflow step is required');
      }

      // TODO: Implement actual API call
      // const response = await createFile(fileData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(
        'File created successfully! Redirecting to officer-dashboard...',
      );

      // Redirect after success
      setTimeout(() => {
        navigate('/officer-dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create file');
    } finally {
      setIsLoading(false);
    }
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New File
          </h1>
        </div>

        {/* Alert messages */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {success && <Alert type="success" message={success} />}

        <form onSubmit={handleSubmit}>
          {/* Basic file information */}
          <Card className="mb-6">
            <h2 className="text-lg font-medium mb-4">File Information</h2>
            <div className="space-y-4">
              <Input
                label="File Title"
                name="title"
                value={fileData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter file title"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={fileData.description}
                  onChange={handleInputChange}
                  placeholder="Enter file description"
                />
              </div>

              {/* File upload section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Documents
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                />
              </div>
            </div>
          </Card>

          {/* Workflow steps section */}
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Workflow Steps</h2>
              <Button
                type="button"
                onClick={handleAddWorkflowStep}
                variant="secondary"
              >
                Add Step
              </Button>
            </div>

            {/* Workflow steps list */}
            {fileData.workflow.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-md"
              >
                <span className="font-medium">Step {index + 1}</span>

                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={step.departmentId}
                  onChange={(e) =>
                    handleWorkflowStepChange(
                      index,
                      'departmentId',
                      e.target.value,
                    )
                  }
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>

                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={step.officerId}
                  onChange={(e) =>
                    handleWorkflowStepChange(index, 'officerId', e.target.value)
                  }
                  required
                >
                  <option value="">Select Officer</option>
                  {officers
                    .filter(
                      (officer) => officer.departmentId === step.departmentId,
                    )
                    .map((officer) => (
                      <option key={officer.id} value={officer.id}>
                        {officer.fullName}
                      </option>
                    ))}
                </select>

                <Button
                  type="button"
                  variant="danger"
                  onClick={() => handleRemoveWorkflowStep(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            {fileData.workflow.length === 0 && (
              <p className="text-gray-500 text-sm">
                No workflow steps added yet. Click "Add Step" to begin.
              </p>
            )}
          </Card>

          {/* Form actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/officer-dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create File'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileCreation;

export {};
