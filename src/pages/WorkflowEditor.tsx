// Import necessary dependencies and types
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  // WorkflowDefinition,
  WorkflowStep,
  Department,
  User,
} from '../types';
import { Button, Card, Alert, Loading } from '../components/shared';

const WorkflowEditor: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();

  // State management
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [officers, setOfficers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isDragging, setIsDragging] = useState<number | null>(null);

  // Load workflow data on component mount
  useEffect(() => {
    loadWorkflowData();
  }, [fileId]);

  // Function to load workflow and related data
  const loadWorkflowData = async () => {
    try {
      // TODO: Implement actual API calls
      // const workflowData = await fetchWorkflow(fileId);
      // const departmentsData = await fetchDepartments();
      // const officersData = await fetchOfficers();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setDepartments([
        { id: '1', name: 'IT Department', code: 'IT' },
        { id: '2', name: 'Finance Department', code: 'FIN' },
        { id: '3', name: 'HR Department', code: 'HR' },
      ]);

      setOfficers([
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

      setWorkflow([
        {
          id: '1',
          fileId: fileId || '',
          stepNumber: 1,
          departmentId: '1',
          officerId: '1',
          status: 'PENDING',
          notes: '',
        },
      ]);
    } catch (err) {
      setError('Failed to load workflow data');
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setIsDragging(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (isDragging === null || isDragging === index) return;

    const newWorkflow = [...workflow];
    const draggedStep = newWorkflow[isDragging];
    newWorkflow.splice(isDragging, 1);
    newWorkflow.splice(index, 0, draggedStep);

    // Update step numbers
    newWorkflow.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });

    setWorkflow(newWorkflow);
    setIsDragging(index);
  };

  const handleDragEnd = () => {
    setIsDragging(null);
  };

  // Workflow step management
  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: `temp-${Date.now()}`,
      fileId: fileId || '',
      stepNumber: workflow.length + 1,
      departmentId: '',
      officerId: '',
      status: 'PENDING',
      notes: '',
    };
    setWorkflow([...workflow, newStep]);
  };

  const handleRemoveStep = (index: number) => {
    const newWorkflow = workflow.filter((_, idx) => idx !== index);
    // Update step numbers
    newWorkflow.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });
    setWorkflow(newWorkflow);
  };

  const handleStepChange = (index: number, field: string, value: string) => {
    const newWorkflow = [...workflow];
    newWorkflow[index] = {
      ...newWorkflow[index],
      [field]: value,
      // Reset officerId if department changes
      ...(field === 'departmentId' && { officerId: '' }),
    };
    setWorkflow(newWorkflow);
  };

  // Save workflow changes
  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate workflow
      if (workflow.length === 0) {
        throw new Error('Workflow must have at least one step');
      }

      if (workflow.some((step) => !step.departmentId || !step.officerId)) {
        throw new Error(
          'All steps must have a department and officer assigned',
        );
      }

      // TODO: Implement actual API call
      // await saveWorkflow(fileId, workflow);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('Workflow saved successfully!');

      // Optional: Navigate back or to file details
      setTimeout(() => {
        navigate(`/files/${fileId}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save workflow');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Loading workflow..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Workflow
          </h1>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
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

        {/* Workflow Editor */}
        <Card>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">Workflow Steps</h2>
            <Button variant="secondary" onClick={handleAddStep}>
              Add Step
            </Button>
          </div>

          <div className="space-y-4">
            {workflow.map((step, index) => (
              <div
                key={step.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center space-x-4 p-4 bg-white border rounded-lg shadow-sm ${
                  isDragging === index ? 'opacity-50' : ''
                }`}
              >
                <div className="flex-none w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                  {step.stepNumber}
                </div>

                <div className="flex-grow grid grid-cols-2 gap-4">
                  <select
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={step.departmentId}
                    onChange={(e) =>
                      handleStepChange(index, 'departmentId', e.target.value)
                    }
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
                      handleStepChange(index, 'officerId', e.target.value)
                    }
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
                </div>

                <div className="flex-none">
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveStep(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="flex-none cursor-move">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </div>
              </div>
            ))}

            {workflow.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No workflow steps defined. Click "Add Step" to begin.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowEditor;

export {};
