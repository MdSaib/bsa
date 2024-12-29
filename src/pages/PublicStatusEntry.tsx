// Import necessary dependencies and types
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Input,
    Card,
    Alert
} from '../components/shared';

const PublicStatusEntryPage: React.FC = () => {
    // State management
    const [fileNumber, setFileNumber] = useState('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!fileNumber.trim()) {
            setError('Please enter a file number');
            return;
        }

        try {
            // TODO: Validate file number format
            if (!/^FILE-\d{4}-\d{3,}$/i.test(fileNumber)) {
                throw new Error('Invalid file number format');
            }

            // Navigate to status display page
            navigate(`/public/status/${fileNumber}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid file number format');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Header with Bengali and English text */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        বাংলাদেশ সচিবালয়
                    </h1>
                    <h2 className="text-xl text-gray-600">
                        File Status Check
                    </h2>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error display */}
                        {error && (
                            <Alert
                                type="error"
                                message={error}
                                onClose={() => setError('')}
                            />
                        )}

                        {/* File number input */}
                        <div>
                            <Input
                                label="File Number"
                                name="fileNumber"
                                value={fileNumber}
                                onChange={(e) => setFileNumber(e.target.value)}
                                placeholder="Enter your file number"
                                required
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Example: FILE-2024-001
                            </p>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Check Status
                        </Button>
                    </form>

                    {/* Help text */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Can't find your file number?</p>
                        <p className="mt-1">
                            Please contact your department's administrative office
                        </p>
                    </div>
                </Card>

                {/* Instructions section */}
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Instructions
                    </h3>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                                <li>
                                    Enter the file number exactly as it appears on your documents
                                </li>
                                <li>
                                    The file number is usually in the format: FILE-YYYY-XXX
                                </li>
                                <li>
                                    Case sensitivity does not matter
                                </li>
                                <li>
                                    You can find your file number on any official correspondence
                                    or the QR code sticker
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Support contact information */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Technical Support</p>
                    <p className="font-semibold">support@secretariat.gov.bd</p>
                    <p>+880 2-XXXX-XXXX</p>
                </div>

                {/* Optional: Language toggle button */}
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                            // TODO: Implement language toggle
                            console.log('Toggle language');
                        }}
                    >
                        বাংলা | English
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicStatusEntryPage;

export {};
