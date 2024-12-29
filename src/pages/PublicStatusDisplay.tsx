// Import necessary dependencies and types
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  // File,
  // WorkflowStep,
  // Department,
  // User,
  PublicFileStatus,
} from '../types';
import { Card, Alert, Loading } from '../components/shared';

// Interface for timeline entries
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

const PublicStatusDisplayPage: React.FC = () => {
  const { fileNumber } = useParams<{ fileNumber: string }>();

  // State management
  const [fileStatus, setFileStatus] = useState<PublicFileStatus | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Load file status on component mount
  useEffect(() => {
    loadFileStatus();
  }, [fileNumber]);

  const loadFileStatus = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for development
      const mockStatus: PublicFileStatus = {
        file: {
          id: '1',
          fileNumber: fileNumber || 'FILE-2024-001',
          title: 'Budget Approval 2024',
          description: 'Annual budget approval for IT department',
          status: 'IN_PROGRESS',
          qrCodeUrl: '#',
          initiatorId: 'user1',
          createdAt: '2024-01-01T00:00:00Z',
          currentStep: 2,
        },
        currentLocation: {
          department: {
            id: '2',
            name: 'Finance Department',
            code: 'FIN',
          },
          officer: {
            id: '2',
            username: 'jane.smith',
            fullName: 'Jane Smith',
            email: 'jane@gov.bd',
            role: 'OFFICER',
            departmentId: '2',
          },
        },
        completedSteps: [
          {
            id: '1',
            fileId: '1',
            stepNumber: 1,
            departmentId: '1',
            officerId: '1',
            status: 'COMPLETED',
            notes: 'Approved by IT Department',
            completedAt: '2024-01-02T00:00:00Z',
          },
        ],
        remainingSteps: [
          {
            id: '3',
            fileId: '1',
            stepNumber: 3,
            departmentId: '3',
            officerId: '3',
            status: 'PENDING',
            notes: '',
          },
        ],
        estimatedCompletionDate: '2024-02-01T00:00:00Z',
      };

      setFileStatus(mockStatus);

      // Create timeline from status data
      const timelineItems: TimelineItem[] = [
        ...mockStatus.completedSteps.map((step) => ({
          date: step.completedAt || '',
          title: `Step ${step.stepNumber}`,
          description: step.notes || 'No notes provided',
          status: 'completed' as const,
        })),
        {
          date: new Date().toISOString(),
          title: `Step ${mockStatus.currentLocation.department.name}`,
          description: 'Currently being processed',
          status: 'current' as const,
        },
        ...mockStatus.remainingSteps.map((step) => ({
          date: '',
          title: `Step ${step.stepNumber}`,
          description: 'Pending',
          status: 'upcoming' as const,
        })),
      ];

      setTimeline(timelineItems);
    } catch (err) {
      setError('Failed to load file status');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return <Loading message="Loading file status..." />;
  }

  // Error state
  if (!fileStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert
          type="error"
          message="File not found. Please check the file number and try again."
        />
      </div>
    );
  }

  // Calculate progress percentage
  const totalSteps = timeline.length;
  const completedSteps = timeline.filter(
    (item) => item.status === 'completed',
  ).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Status</h1>
          <p className="text-lg text-gray-600">
            File Number: {fileStatus.file.fileNumber}
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-medium">
                {fileStatus.currentLocation.department.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  fileStatus.file.status === 'COMPLETED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {fileStatus.file.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created On</p>
              <p className="font-medium">
                {new Date(fileStatus.file.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Completion</p>
              <p className="font-medium">
                {fileStatus.estimatedCompletionDate
                  ? new Date(
                      fileStatus.estimatedCompletionDate,
                    ).toLocaleDateString()
                  : 'Not available'}
              </p>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card>
          <h2 className="text-xl font-medium mb-6">Progress Timeline</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {timeline.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <div className="relative pb-8">
                    {itemIdx !== timeline.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            item.status === 'completed'
                              ? 'bg-green-500'
                              : item.status === 'current'
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        >
                          {item.status === 'completed' ? (
                            <svg
                              className="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-full bg-white" />
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.title}
                          </p>
                          {item.date && (
                            <p className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help understanding this status?</p>
          <p className="mt-1">
            Contact the help desk at{' '}
            <span className="font-semibold">support@secretariat.gov.bd</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicStatusDisplayPage;

export {};
