// Import necessary dependencies and types
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  File,
  FileStatus,
  DashboardFilters,
  PaginatedResponse,
} from '../types';
import {
  Button,
  Card,
  Table,
  Input,
  Loading,
  Alert,
} from '../components/shared';

const OfficerDashboard: React.FC = () => {
  // State management for files and UI controls
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Filtering and pagination state
  const [filters, setFilters] = useState<DashboardFilters>({
    searchTerm: '',
    status: undefined,
    department: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Status options for the filter dropdown
  const statusOptions: FileStatus[] = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'ARCHIVED',
  ];

  // Load files when filters or pagination changes
  useEffect(() => {
    loadFiles();
  }, [filters, currentPage]);

  // Function to load files from the server
  const loadFiles = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetchFiles({ ...filters, page: currentPage });

      // Simulated API response
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResponse: PaginatedResponse<File> = {
        items: [
          {
            id: '1',
            fileNumber: 'FILE-2024-001',
            title: 'Budget Approval 2024',
            description: 'Annual budget approval for IT department',
            status: 'PENDING',
            qrCodeUrl: '#',
            initiatorId: 'user1',
            createdAt: '2024-01-01T00:00:00Z',
            currentStep: 1,
          },
          {
            id: '2',
            fileNumber: 'FILE-2024-002',
            title: 'Infrastructure Project',
            description: 'New road construction project',
            status: 'IN_PROGRESS',
            qrCodeUrl: '#',
            initiatorId: 'user1',
            createdAt: '2024-01-02T00:00:00Z',
            currentStep: 2,
          },
        ],
        total: 10,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };

      setFiles(mockResponse.items);
      setTotalPages(mockResponse.totalPages);
    } catch (err) {
      setError('Failed to load files. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Navigation handlers
  const handleCreateFile = () => {
    navigate('/file-creation');
  };

  const handleFileClick = (fileId: string) => {
    navigate(`/files/${fileId}`);
  };

  // Utility function for status badge styling
  const getStatusBadgeClass = (status: FileStatus): string => {
    const classes = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-gray-100 text-gray-800',
    };
    return classes[status] || classes.PENDING;
  };

  // Main render function with conditional loading state
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Officer Dashboard
          </h1>
          <Button onClick={handleCreateFile} className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New File
          </Button>
        </div>

        {/* Filters section */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Search"
              name="searchTerm"
              value={filters.searchTerm || ''}
              onChange={handleFilterChange}
              placeholder="Search by file number or title..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.status || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Error display */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {/* Files table */}
        <Card>
          {isLoading ? (
            <Loading message="Loading files..." />
          ) : (
            <>
              <Table
                headers={[
                  'File Number',
                  'Title',
                  'Status',
                  'Created At',
                  'Current Step',
                  'Actions',
                ]}
                rows={files.map((file) => [
                  file.fileNumber,
                  file.title,
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      file.status,
                    )}`}
                  >
                    {file.status}
                  </span>,
                  new Date(file.createdAt).toLocaleDateString(),
                  `Step ${file.currentStep}`,
                  <Button
                    variant="secondary"
                    onClick={() => handleFileClick(file.id)}
                  >
                    View Details
                  </Button>,
                ])}
              />

              {/* Pagination controls */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OfficerDashboard;

export {};
