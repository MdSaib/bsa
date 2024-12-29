import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types';
import { Button, Input, Alert } from '../components/shared';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(credentials.username, credentials.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-center text-3xl font-bold text-gray-900">
                        বাংলাদেশ সচিবালয়
                    </h1>
                    <h2 className="mt-2 text-center text-xl text-gray-600">
                        File Management System
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <Alert
                            type="error"
                            message={error}
                            onClose={() => setError('')}
                        />
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                            label="Username"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                            className="mb-4"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>For technical support, please contact:</p>
                    <p className="font-semibold">support@secretariat.gov.bd</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

export {};
