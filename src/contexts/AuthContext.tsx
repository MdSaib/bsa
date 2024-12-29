import React, { createContext, useContext, useState, useEffect } from 'react';
import { User,/*LoginCredentials,*/ AuthResponse } from '../types';

// Define the shape of our context
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing auth on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    // TODO: Validate token with backend
                    // For now, we'll use mock data
                    const mockUser: User = {
                        id: '1',
                        username: 'john.doe',
                        fullName: 'John Doe',
                        email: 'john@gov.bd',
                        role: 'OFFICER',
                        departmentId: '1'
                    };
                    setUser(mockUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem('auth_token');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
        };

        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            // TODO: Replace with actual API call
            // const response = await api.post<AuthResponse>('/auth/login', { username, password });

            // Mock successful login
            const mockResponse: AuthResponse = {
                token: 'mock_token_123',
                user: {
                    id: '1',
                    username: 'john.doe',
                    fullName: 'John Doe',
                    email: 'john@gov.bd',
                    role: 'OFFICER',
                    departmentId: '1'
                }
            };

            localStorage.setItem('auth_token', mockResponse.token);
            setUser(mockResponse.user);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};