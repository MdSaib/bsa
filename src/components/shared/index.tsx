// Import dependencies
import React from 'react';

// Button Component
export const Button: React.FC<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}> = ({
    type = 'button',
    variant = 'primary',
    onClick,
    children,
    className = '',
    disabled = false,
}) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Input Component
export const Input: React.FC<{
    type?: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
}> = ({
    type = 'text',
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    placeholder,
    className = '',
}) => {
    return (
        <div className={`${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } sm:text-sm`}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

// Card Component
export const Card: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
};

// Table Component
export const Table: React.FC<{
    headers: string[];
    rows: React.ReactNode[][];
    className?: string;
}> = ({ headers, rows, className = '' }) => {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Alert Component
export const Alert: React.FC<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    onClose?: () => void;
}> = ({ type, message, onClose }) => {
    const styles = {
        success: 'bg-green-50 text-green-800',
        error: 'bg-red-50 text-red-800',
        warning: 'bg-yellow-50 text-yellow-800',
        info: 'bg-blue-50 text-blue-800',
    };

    return (
        <div className={`rounded-md p-4 ${styles[type]}`}>
            <div className="flex">
                <div className="flex-grow">{message}</div>
                {onClose && (
                    <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={onClose}
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

// Loading Component
export const Loading: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
    return (
        <div className="flex items-center justify-center p-4">
            <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <span className="text-gray-700">{message}</span>
        </div>
    );
};

// Modal Component
export const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export {};
