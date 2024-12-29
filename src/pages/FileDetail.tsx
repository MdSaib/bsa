// Import necessary dependencies and types
import React, { useState, useEffect } from 'react';
import { useParams /*useNavigate*/ } from 'react-router-dom';
import { File, WorkflowStep, FileDocument, User } from '../types';
import { Button, Card, Alert, Loading } from '../components/shared';

const FileDetailPage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  // const navigate = useNavigate();

  // State management
  const [file, setFile] = useState<File | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [documents, setDocuments] = useState<FileDocument[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  // const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    loadFileDetails();
  }, [fileId]);

  const loadFileDetails = async () => {
    try {
      // TODO: Replace with actual API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setFile({
        id: fileId || '1',
        fileNumber: 'FILE-2024-001',
        title: 'Budget Approval 2024',
        description: 'Annual budget approval for IT department',
        status: 'IN_PROGRESS',
        qrCodeUrl: 'https://via.placeholder.com/150',
        initiatorId: 'user1',
        createdAt: '2024-01-01T00:00:00Z',
        currentStep: 2,
      });

      setWorkflowSteps([
        {
          id: '1',
          fileId: fileId || '1',
          stepNumber: 1,
          departmentId: '1',
          officerId: '1',
          status: 'COMPLETED',
          notes: 'Approved by IT Department',
          completedAt: '2024-01-02T00:00:00Z',
        },
        {
          id: '2',
          fileId: fileId || '1',
          stepNumber: 2,
          departmentId: '2',
          officerId: '2',
          status: 'IN_PROGRESS',
          notes: '',
        },
      ]);

      setDocuments([
        {
          id: '1',
          fileId: fileId || '1',
          documentUrl: '#',
          uploadedBy: 'user1',
          documentType: 'application/pdf',
          uploadDate: '2024-01-01T00:00:00Z',
        },
      ]);

      setCurrentUser({
        id: '2',
        username: 'jane.smith',
        fullName: 'Jane Smith',
        email: 'jane@gov.bd',
        role: 'OFFICER',
        departmentId: '2',
      });
    } catch (err) {
      setError('Failed to load file details');
    } finally {
      setIsLoading(false);
    }
  };

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(
        `<html><head><title>Print QR Code</title></head><body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;"><img src="${file?.qrCodeUrl}" alt="QR Code" /></body></html>`,
      );
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleStatusUpdate = async (status: 'COMPLETED' | 'IN_PROGRESS') => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('Status updated successfully');
      await loadFileDetails();
    } catch (err) {
      setError('Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual file upload
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('Documents uploaded successfully');
      await loadFileDetails();
    } catch (err) {
      setError('Failed to upload documents');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRScan = async () => {
    try {
      setShowQRScanner(true);
      // TODO: Implement QR scanning logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleStatusUpdate('IN_PROGRESS');
    } catch (err) {
      setError('Failed to scan QR code');
    } finally {
      setShowQRScanner(false);
    }
  };

  if (isLoading) {
    return <Loading message="Loading file details..." />;
  }

  if (!file) {
    return <Alert type="error" message="File not found" />;
  }

  const currentStep = workflowSteps.find(
    (step) => step.status === 'IN_PROGRESS',
  );
  const isCurrentOfficer = currentStep?.officerId === currentUser?.id;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {file.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                File Number: {file.fileNumber}
              </p>
            </div>
            <div className="flex space-x-4">
              {/* <Button variant="secondary" onClick={handleQRScan}>
                Scan QR Code
              </Button> */}
              {isCurrentOfficer && (
                <Button onClick={() => handleStatusUpdate('COMPLETED')}>
                  Mark as Completed
                </Button>
              )}
            </div>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR Code Section */}
          <Card className="lg:col-span-1 text-center">
            <h2 className="text-lg font-medium mb-4">QR Code</h2>
            <img
              src={file.qrCodeUrl}
              alt="QR Code"
              className="mx-auto mb-4 w-32 h-32"
            />
            <Button onClick={printQRCode}>Print QR Code</Button>
          </Card>

          {/* File Details */}
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-medium mb-4">File Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Description
                </label>
                <p className="mt-1">{file.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    file.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {file.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Created At
                </label>
                <p className="mt-1">
                  {new Date(file.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Workflow Progress */}
          <Card>
            <h2 className="text-lg font-medium mb-4">Workflow Progress</h2>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-start space-x-3 ${
                    index !== workflowSteps.length - 1
                      ? 'pb-4 border-b border-gray-200'
                      : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                      step.status === 'COMPLETED'
                        ? 'bg-green-100'
                        : step.status === 'IN_PROGRESS'
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {step.status === 'COMPLETED' ? '✓' : step.stepNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Step {step.stepNumber}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {step.notes || 'No notes added'}
                    </div>
                    {step.completedAt && (
                      <div className="mt-1 text-xs text-gray-400">
                        Completed: {new Date(step.completedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Documents Section */}
          <Card className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Documents</h2>
              {isCurrentOfficer && (
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Upload Documents
                  </label>
                </div>
              )}
            </div>

            {documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-4 flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Document {doc.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <a
                        href={doc.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No documents uploaded yet
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Scan QR Code</h3>
            <div className="w-64 h-64 bg-gray-100 mb-4">
              {/* TODO: Implement QR scanner component */}
            </div>
            <Button variant="secondary" onClick={() => setShowQRScanner(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDetailPage;

export {};
